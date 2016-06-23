import {Page, Platform, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {BusListPage} from '../buslist/buslist';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Component({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    private platform;
    private nav;
    private os;

    //-----Language-----
    public beginTour;

    constructor(platform: Platform, nav: NavController, private busdriveinterface: BusDriveInterface) {
        this.platform = platform;
        this.nav = nav;

        //-----Language-----
        this.beginTour = language.beginTour;
        this.getMobileOperatingSystem();
    }

    /**
     * requests data from server via services component
     */
    ionViewDidEnter(){
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

