import {Page, Platform, NavController, Alert} from 'ionic-angular';
import {Component} from '@angular/core';
import {BusListPage} from '../buslist/buslist';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {TranslatePipe} from "ng2-translate/ng2-translate";
@Component({
    templateUrl: 'build/pages/home/home.html',
    pipes: [TranslatePipe]
})

export class HomePage {
    private os;
    private recievedalldata = [false, false, false, false];
    private recieveddata = false;

    //-----Language-----
   // public beginTour;
    public recieveddataTrans;

    constructor(private platform: Platform, private nav: NavController, private busdriveinterface: BusDriveInterface) {
        this.getMobileOperatingSystem();
        this.requestData();

        //-----Language-----
        //this.beginTour = language.beginTour;
        this.recieveddataTrans = language.recieveddata;
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
            title: this.recieveddataTrans,
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

