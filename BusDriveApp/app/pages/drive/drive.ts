import {Page, NavParams, Events, Toast, Alert, ActionSheet, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {LocalNotifications} from 'ionic-native';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {CustomStopPage} from '../drive/customstop/customstop';


@Component({
    templateUrl: 'build/pages/drive/drive.html',
})
export class DrivePage {
    private selectedbusid;
    private counter: number = 0;
    private nextStop: string;
    private drive: string = "driving";
    private totalbusseats: number;
    private newcustomstopscounter: number;
    private linestopsnames = [];
    private linecustomstopsall = [];
    private acceptedcustomstops = [];

    //-----Language-----
    public passengers;
    public title;

    constructor(private nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface, public events: Events) {
        this.selectedbusid = navParams.data[0]
        this.getBusSeatsNumber();
        this.getLineStopsNames();
        this.nextStop = this.linestopsnames[0];
        this.events.subscribe("newCustomStops", () => {
            this.getCustomStops();
        });
        this.events.subscribe("accept", customstop => {
            this.acceptCustomStop(customstop[0])
        });
        this.events.subscribe("decline", customstop => {
            this.declineCustomStop(customstop[0])
        });
        this.events.subscribe("complete", customstop => {
            this.completeAcceptedCustomStop(customstop[0])
        });
        this.events.subscribe("noshow", customstop => {
            this.noShowAcceptedCustomStop(customstop[0])
        });


        //-----Language-----
        this.passengers = language.passengers;
        this.title = language.driveTitle;

    }
    /**
     * increases the counter of the passengers
     */
    increasePassengers() {
        if (this.counter < this.totalbusseats) {
            this.counter++
        }
    }

    /**
     * decreases the counter of the passengers
     */
    decreasePassengers() {
        if (this.counter > 0) {
            this.counter--;
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
     */
    getCustomStops() {
        let newlinecustomstopsall = this.busdriveinterface.getLineCustomStopsAll();
        if (newlinecustomstopsall.length > 0) {
            if (this.linecustomstopsall.length > 0) {
                let newcustomstopsid: number[] = [];
                this.newcustomstopscounter = Math.abs(this.linecustomstopsall.length - newlinecustomstopsall.length);
                if (this.newcustomstopscounter === 0) {
                    this.newcustomstopscounter = undefined;
                }
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
            }
            else {
                this.linecustomstopsall.push(...newlinecustomstopsall);
                this.newcustomstopscounter = this.linecustomstopsall.length;
            }
            if (this.newcustomstopscounter > 0) {
                LocalNotifications.schedule({
                    id: 1,
                    text: this.newcustomstopscounter + ' new Custom Stops',
                });
                this.nav.present(ActionSheet.create({
                    title: this.newcustomstopscounter + ' new Custom Stops',
                    buttons: [
                        {
                            text: 'Anzeigen',
                            handler: () => {
                                this.drive = "customstops";
                                this.nav.parent.select(0);
                                this.resetNewCustomStopsCounter();
                                console.log('Anzeigen');
                            }
                        }]
                }))
            }
        }
    }

    /**
     * @param customStop custom stop
     * accepts a customStop
     */
    acceptCustomStop(customstop) {
        this.acceptedcustomstops.push(customstop);
        let posnumber = this.linecustomstopsall.indexOf(customstop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "accepted");
        this.events.publish("acceptedCustomStops", this.acceptedcustomstops);
    }

    /**
     * @param customStop custom stop
     * declines a customStop
     */
    declineCustomStop(customstop) {
        let posnumber = this.linecustomstopsall.indexOf(customstop);
        if (posnumber > -1) {
            this.linecustomstopsall.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "rejected");
    }

    /**
     * @param customstops accepted customstops
     * completes a acceptedcustomstop with complete
     */
    completeAcceptedCustomStop(customstop) {
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "completed");
        this.events.publish("acceptedCustomStops", this.acceptedcustomstops);
    }

    /**
     * @param acceptedcustomstops accepted customstops
     * completes a acceptedcustomstop with noshow
     */
    noShowAcceptedCustomStop(customstop) {
        let posnumber = this.acceptedcustomstops.indexOf(customstop);
        if (posnumber > -1) {
            this.acceptedcustomstops.splice(posnumber, 1)
        }
        this.busdriveinterface.postCustomStopStatus(customstop[0], "noshow");
        this.events.publish("acceptedCustomStops", this.acceptedcustomstops);
    }

    /**
     * shows map fragment and all infromation of the customstop
     */
    showCustomStop(customstop) {
        console.log("-> CustomStopPage");
        for (let index = 0; index < this.linecustomstopsall.length; index++) {
            if (this.linecustomstopsall[index] == customstop) {
                this.nav.push(CustomStopPage, {
                    showcustomstop: customstop,
                    accepted: false
                });
            }
        }
    }

    /**
     * shows map fragment and all infromation of the accepted customstop
     */
    showAcceptedCustomStop(customstop) {
        console.log("-> CustomStopPage");
        for (let index = 0; index < this.acceptedcustomstops.length; index++) {
            if (this.acceptedcustomstops[index] == customstop) {
                this.nav.push(CustomStopPage, {
                    showcustomstop: customstop,
                    accepted: true
                });
            }
        }
    }

    /**
     * reset newcustomstops counter
     */
    resetNewCustomStopsCounter() {
        this.newcustomstopscounter = undefined;
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
}
