import {Page, NavParams, Platform, Events, NavController, Loading} from 'ionic-angular';
import {Component, ViewChild} from  '@angular/core';
import {GoogleMapsLatLng} from 'ionic-native';
import {NativeMap} from '../../components/nativemap/nativemap';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    templateUrl: 'build/pages/nativemap/nativemap.html',
    directives: [NativeMap],
    pipes: [TranslatePipe]
})

export class NativeMapPage {
    @ViewChild(NativeMap) nativemap: NativeMap;
    private selectedline;
    private loading;
    private linestopscoordinates = [];
    private linestopsnames = [];
    private lineroutecoordinates = [];
    private acceptedcustomstops = [];
    private backbuttoncounter: number = 0;

    constructor(private busdriveinterface: BusDriveInterface, private nav: NavController, private platform: Platform, public events: Events) {
        this.getLineRouteCoordinates();
        this.getLineStopsCoordinates();
        this.getLineStopsNames();
        this.events.subscribe("mapLoaded", () => {
            this.showLine();
        });
        this.events.subscribe("acceptedCustomStops", (acceptedcustomstops) => {
            this.acceptedcustomstops = acceptedcustomstops[0];
            this.nativemap.loadCustomStops(this.acceptedcustomstops);
        });
        this.events.subscribe("ShowCustomStop", (customstop) => {
            this.showCustomStopRoute(customstop[0]);
        });
        this.events.subscribe("LoadCustomStop", () => {
            this.loading = Loading.create({})
            this.nav.present(this.loading);
        });
        this.events.subscribe("CustomStopLoaded", () => {
            this.loading.dismiss();
        });
        this.platform.registerBackButtonAction(this.endTour.bind(this));
        this.events.subscribe("endTourAborted", () => {
            this.backbuttoncounter = 0;
        });
    }

    /**
     * gets the coordinates of linestops
     */
    getLineStopsCoordinates() {
        this.linestopscoordinates = this.busdriveinterface.getLineStopsCoordinates();
    }

    /**
     * gets the names of linestops
     */
    getLineStopsNames() {
        this.linestopsnames = this.busdriveinterface.getLineStopsNames();
    }

    /**
     * gets the coordinates of lineroute
     */
    getLineRouteCoordinates() {
        this.lineroutecoordinates = this.busdriveinterface.getLineRouteCoordinatesNative();
    }

    /**
     * shows the line ( stops and route ) on the map 
     */
    showLine() {
        this.nativemap.loadRoute(this.lineroutecoordinates);
        this.nativemap.loadStops(this.linestopscoordinates, this.linestopsnames);
    }

    /**
     * shows a customstop on the map ( route and marker)
     */
    showCustomStopRoute(customstop) {
        this.loading = Loading.create({});
        this.nav.present(this.loading);
        this.nativemap.calcCustomStopRoute(customstop);
    }

    /**
     * ends the tour if confirmed
     */
    endTour() {
        if (this.backbuttoncounter === 0) {
            this.events.publish("EndTour");
            this.nativemap.disableInteraction();
        }
        this.backbuttoncounter = 1;
    }

    ionViewDidLeave() {
        this.nativemap.clearCustomStop();
    }

    ionViewDidEnter() {
        this.platform.registerBackButtonAction(this.endTour.bind(this));
    }

    ionViewLoaded() {
        this.nav.parent.select(0);
    }
}
