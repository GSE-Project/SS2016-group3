import {Page, NavParams, Events, Toast, Alert, Platform, ActionSheet, Modal, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {LocalNotifications} from 'ionic-native';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";

@Component({
    templateUrl: 'build/pages/drive/drive.html',
    pipes: [TranslatePipe]
})

export class DrivePage {
    private selectedbusid;
    private counter: number = 0;
    private nextStop: string;
    private drive: string = "customstops";
    private totalbusseats: number;
    private newcustomstopscounter: number;
    private newcustomstopsnumber: number;
    private linestopsnames = [];
    private linecustomstopsall = [];
    private acceptedcustomstops = [];
    private backbuttoncounter: number = 0;

    constructor(private nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface, private platform: Platform, public events: Events, public translate: TranslateService) {
        this.selectedbusid = navParams.data[0]
        this.getBusSeatsNumber();
        this.getLineStopsNames();
        this.nextStop = this.linestopsnames[0];
        this.events.subscribe("newCustomStops", (linecustomstopsall) => {
            this.getCustomStops(linecustomstopsall[0]);
        });
        this.events.subscribe("accept", customstop => {
            this.acceptCustomStop(customstop[0]);
        });
        this.events.subscribe("decline", customstop => {
            this.declineCustomStop(customstop[0]);
        });
        this.events.subscribe("complete", customstop => {
            this.completeAcceptedCustomStop(customstop[0])
        });
        this.events.subscribe("noshow", customstop => {
            this.noShowAcceptedCustomStop(customstop[0]);
        });

        this.platform.registerBackButtonAction(this.endTour.bind(this));
        this.events.subscribe("endTourAborted", () => {
            this.backbuttoncounter = 0;
        })
    }

    /**
     * increases the counter of the passengers
     */
    increasePassengers() {
        if (this.counter < this.totalbusseats) {
            this.counter++
            this.events.publish("Passenger", this.counter);
        }
    }

    /**
     * decreases the counter of the passengers
     */
    decreasePassengers() {
        if (this.counter > 0) {
            this.counter--;
            this.events.publish("Passenger", this.counter);
        }
    }

    /**
     * gets number of total seats of the selected busses 
     */
    getBusSeatsNumber() {
        this.totalbusseats = this.busdriveinterface.getBusSeatsNumber(this.selectedbusid);
    }

    /**
     * gets the names of linestops
     */
    getLineStopsNames() {
        this.linestopsnames = this.busdriveinterface.getLineStopsNames();
    }

    /**
     * gets customstops and creates a notification
     * @param linecustomstopsall customstops ( with all needed information) of the lines
     */
    getCustomStops(linecustomstopsall) {
        let newlinecustomstopsall = [];
        if (this.acceptedcustomstops.length === 0) {
            for (let i = 0; i < linecustomstopsall.length; i++) {
                if (linecustomstopsall[i][7] === 2) {
                    this.acceptedcustomstops.push(linecustomstopsall[i]);
                }
            }
            this.events.publish("acceptedCustomStops", this.acceptedcustomstops);
        }
        for (let i = 0; i < linecustomstopsall.length; i++) {
            if (linecustomstopsall[i][7] === 1) {
                newlinecustomstopsall.push(linecustomstopsall[i]);
            }
        }
        if (newlinecustomstopsall.length > 0) {
            if (this.linecustomstopsall.length > 0) {
                let newcustomstopsid: number[] = [];
                this.newcustomstopsnumber = Math.abs(this.linecustomstopsall.length - newlinecustomstopsall.length);
                this.linecustomstopsall.push(...newlinecustomstopsall);
                for (let i = 0; i < this.linecustomstopsall.length; i++) {
                    newcustomstopsid.push(this.linecustomstopsall[i][0])
                }
                newcustomstopsid = newcustomstopsid.filter(function (v, i, a) { return a.indexOf(v) === i });
                let newcustomstops = [];
                for (let i = 0; i < this.linecustomstopsall.length; i++) {
                    for (let j = 0; j < newcustomstopsid.length; j++) {
                        if (this.linecustomstopsall[i][0] === newcustomstopsid[j]) {
                            newcustomstops.push(this.linecustomstopsall[i]);
                            newcustomstopsid.splice(j, 1);
                        }
                    }
                }
                this.linecustomstopsall = newcustomstops;
                this.newcustomstopscounter = this.linecustomstopsall.length;
            }
            else {
                this.linecustomstopsall.push(...newlinecustomstopsall);
                this.newcustomstopscounter = this.linecustomstopsall.length;
                this.newcustomstopsnumber = this.linecustomstopsall.length;
            }
            if (this.newcustomstopsnumber > 0) {
                LocalNotifications.schedule({
                    id: 1,
                    text: this.newcustomstopsnumber + " " + this.translate.instant("drive.newStopsTrans"),
                });
                this.nav.present(Toast.create({
                    message: this.newcustomstopsnumber + " " + this.translate.instant("drive.newStopsTrans"),
                    duration: 5000,
                    position: "top",
                    showCloseButton: true,
                    closeButtonText: "Ok",
                    dismissOnPageChange: true
                }))
            }
        }
        this.linecustomstopsall = newlinecustomstopsall;
        this.newcustomstopscounter = this.linecustomstopsall.length;
        for (let i = 0; i < this.acceptedcustomstops.length; i++) {
            for (let j = 0; j < linecustomstopsall.length; j++) {
                if (this.acceptedcustomstops[i][0] === linecustomstopsall[j][0]) {
                    this.acceptedcustomstops[i][7] = linecustomstopsall[j][7];
                }
            }
        }
    }

    /**
     * accepts a customStop
     * @param customStop custom stop
     */
    acceptCustomStop(customstop) {
        this.acceptedcustomstops.push(customstop);
        let posnumber = this.linecustomstopsall.indexOf(customstop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.newcustomstopscounter = this.linecustomstopsall.length;
        if (this.newcustomstopscounter === 0) {
            this.newcustomstopscounter = undefined;
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], this.selectedbusid, 2);
        this.events.publish("acceptedCustomStops", this.acceptedcustomstops);
    }

    /**
     * declines a customStop
     * @param customStop custom stop
     */
    declineCustomStop(customstop) {
        let posnumber = this.linecustomstopsall.indexOf(customstop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.newcustomstopscounter = this.linecustomstopsall.length;
        if (this.newcustomstopscounter === 0) {
            this.newcustomstopscounter = undefined;
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], this.selectedbusid, 3);
    }

    /**
     * completes a acceptedcustomstop with complete
     * @param customstops accepted customstops
     */
    completeAcceptedCustomStop(customstop) {
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], this.selectedbusid, 4);
        this.events.publish("acceptedCustomStops", this.acceptedcustomstops);
    }

    /**
     * completes a acceptedcustomstop with noshow
     * @param customstop accepted customstops
     */
    noShowAcceptedCustomStop(customstop) {
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], this.selectedbusid, 5);
        this.events.publish("acceptedCustomStops", this.acceptedcustomstops);
    }

    /**
     * deletes canceled customstop
     * @param customstop accepted customstop which was canceled
     */
    deleteCanceledCustomStop(customstop) {
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
    }

    /**
     * shows the customstop on the map
     * @param customstop a customstop
     */
    showCustomStop(customstop) {
        console.log("-> MapPage");
        for (let index = 0; index < this.linecustomstopsall.length; index++) {
            if (this.linecustomstopsall[index] == customstop) {
                this.nav.parent.select(1);
                this.events.publish("ShowCustomStop", (customstop));
            }
        }
    }

    /**
     * shows the accepted customstop on the map
     * @param customstop a accepted customstop
     */
    showAcceptedCustomStop(customstop) {
        console.log("-> MapPage");
        for (let index = 0; index < this.acceptedcustomstops.length; index++) {
            if (this.acceptedcustomstops[index] == customstop) {
                this.nav.parent.select(1);
                this.events.publish("ShowCustomStop", (customstop));
            }
        }
    }

    /**
     * clears local notification
     */
    clearLocalNotifications() {
        LocalNotifications.clear(1);
    }

    /**
     * switches to next stop
     */
    showNextStop() {
        this.linestopsnames.push(this.linestopsnames.shift());
        this.nextStop = this.linestopsnames[0];
        console.log("next stop: " + this.linestopsnames[0]);
    }

    /**
     * switches to previous stop
     */
    showPrevioustStop() {
        this.linestopsnames.unshift(this.linestopsnames.pop());
        this.nextStop = this.linestopsnames[0];
        console.log("next stop: " + this.linestopsnames[0]);
    }

    /**
     * ends the tour if confirmed
     */
    endTour() {
        if (this.backbuttoncounter === 0) {
            this.events.publish("EndTour");
        }
        this.backbuttoncounter = 1;
    }
}