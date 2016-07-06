import {Page, Platform, NavController, Alert,Popover} from 'ionic-angular';
import {Component} from '@angular/core';
import {BusListPage} from '../buslist/buslist';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {TranslatePipe,TranslateService} from "ng2-translate/ng2-translate";
import {PopoverPage} from '../home/popover/Popover'
@Component({
    templateUrl: 'build/pages/home/home.html',
    pipes: [TranslatePipe]
})

export class HomePage {
    private os;
    private recievedalldata = [false, false, false, false];
    private recieveddata = false;

   

    constructor(private platform: Platform, private nav: NavController, private busdriveinterface: BusDriveInterface, private translate:TranslateService) {
        this.getMobileOperatingSystem();
        this.requestData();
    }
    presentPopover(ev) {
    let popover = Popover.create(PopoverPage, {
    });

    this.nav.present(popover, {
      ev: ev
    });
}

    /**
     * requests data from server via services component
     */
    requestData() {
        this.busdriveinterface.clearLists();
        this.busdriveinterface.requestBusses().then(() => {
            this.recievedalldata[0] = true;
        });
        this.busdriveinterface.requestLines().then(() => {
            this.recievedalldata[1] = true;
        });;
        this.busdriveinterface.requestStops().then(() => {
            this.recievedalldata[2] = true;
        });;
        this.busdriveinterface.requestRoutes().then(() => {
            this.recievedalldata[3] = true;
        });;
    }

    /**
     * switches the GUI on BusListPage and passes the url of the server
     */
    navigate() {
        for (let i = 0; i < this.recievedalldata.length; i++) {
            if (this.recievedalldata[i]) {
                this.recieveddata = true;
            }
            else {
                this.recieveddata = false;
            }
        }
        if (this.recieveddata) {
            console.log("-> BusListPage");
            this.nav.push(BusListPage, {
            });
        }
        else {
            let alert = Alert.create({
            title: this.translate.instant("home.noDataTrans"),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        console.log('alert confirmed');
                        this.requestData();
                    }
                }]
        });
        this.nav.present(alert);

        }
    }

    /**
     * detects the OS
     */
    getMobileOperatingSystem() {
        if (this.platform.is('ios')) {
            this.os = 'iOS';
        }
        else if (this.platform.is('android')) {
            this.os = 'Android';
        }
        else {
            this.os = 'unknown';
        }
        console.log("current OS: " + this.os);
    }
}

