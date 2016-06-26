import {Page, Platform, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {BusListPage} from '../buslist/buslist';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Component({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    private os;

    //-----Language-----
    public beginTour;

    constructor(private platform: Platform, private nav: NavController, private busdriveinterface: BusDriveInterface) {
        this.getMobileOperatingSystem();
        this.requestData();

        //-----Language-----
        this.beginTour = language.beginTour;
    }

    /*
     ionViewWillEnter() {
        this.requestData();
    } 
    */

    /**
     * requests data from server via services component
     */
    requestData() {
        this.busdriveinterface.clearLists();
        this.busdriveinterface.requestBusses();
        this.busdriveinterface.requestLines();
        this.busdriveinterface.requestStops();
        this.busdriveinterface.requestRoutes();
    }

    /**
     * switches the GUI on BusListPage and passes the url of the server
     */
    navigate() {
        console.log("-> BusListPage");
        this.nav.push(BusListPage, {
        });
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

