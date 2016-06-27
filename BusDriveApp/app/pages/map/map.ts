import {Page, NavParams, Platform, NavController, Events} from 'ionic-angular';
import {Component, ViewChild} from  '@angular/core';
import {Map} from '../../components/map/map';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Component({
    templateUrl: 'build/pages/map/map.html',
    directives: [Map]
})

export class MapPage {
    @ViewChild(Map) map: Map;
    private selectedline;
    private linestopscoordinates = [];
    private linestopsnames = [];
    private lineroutecoordinates = [];
    private acceptedcustomstops = [];
    private backbuttoncounter: number = 0;

    //-----Language-----
    public title;

    constructor(private busdriveinterface: BusDriveInterface, private platform: Platform, public events: Events) {
        this.getLineRouteCoordinates();
        this.getLineStopsCoordinates();
        this.getLineStopsNames();
        this.events.subscribe("acceptedCustomStops", acceptedcustomstops => {
            this.acceptedcustomstops = acceptedcustomstops[0];
            this.map.loadCustomStops(this.acceptedcustomstops);
        });
        this.events.subscribe("mapLoaded", () => {
            this.showLine();
        });

        this.platform.registerBackButtonAction(this.endTour.bind(this));
        this.events.subscribe("endTourAborted", () => {
            this.backbuttoncounter = 0;
        })
        
        //-----Language-----
        this.title = language.mapTitle;
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
        this.lineroutecoordinates = this.busdriveinterface.getLineRouteCoordinates();
    }

    /**
     * shows the line ( stops and route ) on the map 
     */
    showLine() {
        this.map.loadRoute(this.lineroutecoordinates);
        this.map.loadStops(this.linestopscoordinates, this.linestopsnames);
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