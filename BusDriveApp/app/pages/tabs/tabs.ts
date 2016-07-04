import {Page, Alert, ActionSheet, NavController, NavParams, MenuController, Events, Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {DrivePage} from '../drive/drive';
import {MapPage} from '../map/map';
import {NativeMapPage} from '../nativemap/nativemap';
import {StopsPage} from '../stops/stops';
import {Geolocation} from 'ionic-native';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {language} from "../../components/languages/languages";
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
    private nav;
    private tab1Root;
    private tab2Root;
    private tab3Root;
    private sendintervalID;
    private requestintervalID;

    private serverURL;
    private rootParams = [];
    private selectedbus;
    private selectedline;
    private lng = 0;
    private lat = 0;
    private lastSendTime = undefined;
    private passangerscounter = 0;



    constructor(private platform: Platform, nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface, private menu: MenuController, public events: Events,private  translate: TranslateService) {
        this.nav = nav;
        this.tab1Root = DrivePage;
        this.tab3Root = StopsPage;
        this.setMapPage();
        this.menu.swipeEnable(false);

        this.selectedbus = navParams.get("selectedbus");
        this.selectedline = navParams.get("selectedline");
        this.rootParams = [this.selectedbus, this.selectedline];

        this.updateBusStatus();
        this.getLineRoute();
        this.getLineStops();
        this.requestintervalID = setInterval(this.requestLineCustomStops.bind(this), 5000);
        this.sendintervalID = setInterval(this.sendrealTimeData.bind(this), 5000);

        this.events.subscribe("EndTour", () => {
            this.endTour();
        })
        this.events.subscribe("Passneger", (counter) => {
            this.passangerscounter = counter[0];
        });


    }

    /**
     * sets MapPage depending on platform
     */
    setMapPage() {
        if (this.platform.is('ios')) {
            this.tab2Root = MapPage;
            console.log("MapPage");
        }
        else if (this.platform.is('android')) {
            this.tab2Root = NativeMapPage;
            console.log("NativeMapPage");
        }
        else {
            this.tab2Root = MapPage;
            console.log("MapPage");
        }
    }

    /**
     * gets the linestops
     */
    getLineStops() {
        this.busdriveinterface.getLineStops(this.selectedline);
    }

    /**
     * gets the lineroute
     */
    getLineRoute() {
        this.busdriveinterface.getLineRoute(this.selectedline);
    }

    /**
     * requests linecustomstops
     */
    requestLineCustomStops() {
        this.busdriveinterface.requestLineCustomStops(this.selectedline).then(() => {
            let linecustomstops = this.busdriveinterface.getLineCustomStopsAll();
            this.events.publish("newCustomStops", linecustomstops);
        });;

    }

    /**
     * updates the bus status and sends it to server iva services component
     */
    updateBusStatus() {
        this.busdriveinterface.postBusStatus(this.selectedbus, this.selectedline)
    }

    /**
     * sends the current position, the id of the selected bus and the time to the server via services component
     */
    sendrealTimeData() {
        let currenTime = undefined;
        Geolocation.getCurrentPosition().then((resp) => {
            let latitude = resp.coords.latitude;
            let longitude = resp.coords.longitude;
            let busspeed = resp.coords.speed;
            if ((this.distance(this.lat, this.lng, latitude, longitude) > 75) || (currenTime - this.lastSendTime > 56000)) {
                this.busdriveinterface.postRealTimeData(this.selectedbus, longitude, latitude, this.passangerscounter)
                this.lat = latitude;
                this.lng = longitude;
                this.lastSendTime = new Date();
            }
        });
        currenTime = new Date();
        console.log("passed time after last send: " + (currenTime - this.lastSendTime));
    }

    /**
     * calculates the distance between two points (given the latitude/longitude of those points)
     * @param lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
     * @param lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
     * @returns distance between two points
     */
    distance(lat1, lng1, lat2, lng2) {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lng1 - lng2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        dist = dist * 1000;
        console.log("positiondistance: " + dist);
        return dist
    }

    /**
     * alert when leaving, if you click "OK" GUI will change to HomePage and you will stop sending, if you click "Abbrechen" nothing will happen.
     */
    endTour() {
        let alert = ActionSheet.create({
            title: language.alertTitle,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        console.log('alert confirmed');
                        this.nav.setRoot(HomePage);
                        this.events.publish("endTourConfirmed");
                        clearInterval(this.sendintervalID);
                        clearInterval(this.requestintervalID);
                    }
                },
                 {
                    text: this.translate.instant("cancelTrans"),
                    handler: () => {
                        console.log('alert aborted');
                        this.events.publish("endTourAborted");
                    }
                }]
        });
        this.nav.present(alert);
    }
}