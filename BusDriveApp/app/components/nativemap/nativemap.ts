import {Component, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Events} from 'ionic-angular';
import {Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsMarker, GoogleMapsLatLng, GoogleMapsPolyline} from 'ionic-native';

@Component({
    selector: 'nativemap',
    templateUrl: 'build/components/nativemap/nativemap.html'
})

export class NativeMap implements OnDestroy, AfterViewInit {
    private map;
    private mapElement;
    private mapElementId;
    private lineroutecoordinates = [];
    private lineroutepolyline;
    private linestopscoordinates = [];
    private linestopsnames = [];
    private linestopsmarkers = [];
    private customstopsmarkers = [];

    constructor(private element: ElementRef, public events: Events) {
        this.events.subscribe("endTourAborted", () => {
            this.enableInteraction();
        })
        this.events.subscribe("endTourConfirmed", () => {
            this.removeMap();
        });
    }

    /**
     * loads Google Maps and shows its own position
     */
    loadMap() {
        this.mapElementId = 'map' + new Date().getTime();
        this.mapElement = this.element.nativeElement;
        this.mapElement.setAttribute('id', this.mapElementId);
        let mapoptions = {
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            }
        };
        this.map = new GoogleMap(this.mapElementId, mapoptions);
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.centerCamera();
            this.events.publish("mapLoaded");
            console.log("successfully loaded map");
        });
    }

    /**
     * centers camera to own position
     */
    centerCamera() {
        let options = { timeout: 10000, enableHighAccuracy: true };
        Geolocation.getCurrentPosition(options).then((resp) => {
            let latitude = resp.coords.latitude;
            let longitude = resp.coords.longitude;
            this.map.animateCamera({
                'target': new GoogleMapsLatLng(latitude, longitude),
                'tilt': 10,
                'zoom': 15,
                'bearing': 0,
                'duration': 6000
            });
        })
    }

    /**
     * loads the route and shows it on the map
     * @param lineroutecoordinates list of coordinates of the lineroute
     */
    loadRoute(lineroutecoordinates) {
        this.lineroutecoordinates = lineroutecoordinates;
        let routepath = [];
        for (let i = 0; i < lineroutecoordinates.length; i++) {
            let latlng = new GoogleMapsLatLng(lineroutecoordinates[i][0], lineroutecoordinates[i][1]);
            routepath.push(latlng);
        };
        this.map.addPolyline({
            points: routepath,
            'geodesic': true,
            'visible': true,
            'color': '#FF0000',
            'width': 4
        }).then((polyline) => {
            this.lineroutepolyline = polyline;
        });
    }

    /**
     * loads the stops and shows them as a marker on the map
     * @param linestopscoordinates list of coordinates of the linetops
     * @param linestopsnames list of the names of the linetops
     */
    loadStops(linestopscoordinates, linestopsnames) {
        this.linestopscoordinates = linestopscoordinates;
        this.linestopsnames = linestopsnames;
        for (let index = 0; index < linestopscoordinates.length; index++) {
            let stopLatLng = new GoogleMapsLatLng(linestopscoordinates[index][1], linestopscoordinates[index][0]);
            this.map.addMarker({
                'position': stopLatLng,
                'title': linestopsnames[index]
            }).then((marker) => {
                this.linestopsmarkers.push(marker);
            });
        };
    }

    /**
     * loads the custumstops and shows them as a marker on the map
     * @param acceptedcustomstops list of accepted customstops
     */
    loadCustomStops(acceptedcustomstops) {
        for (let i = 0; i < this.customstopsmarkers.length; i++) {
            this.customstopsmarkers[i].remove();
        }
        this.customstopsmarkers = [];
        for (let i = 0; i < this.linestopsmarkers.length; i++) {
            this.linestopsmarkers[i].remove();
        }
        this.loadStops(this.linestopscoordinates, this.linestopsnames);
        for (let index = 0; index < acceptedcustomstops.length; index++) {
            let customstopLatLng = new GoogleMapsLatLng(acceptedcustomstops[index][6][1], acceptedcustomstops[index][6][0]);
            this.map.addMarker({
                'position': customstopLatLng,
                'title': acceptedcustomstops[index][1],
                'snippet': 
                    'Abholzeit: ' + acceptedcustomstops[index][2] + '\nAnzahl: ' + acceptedcustomstops[index][3] + '\nAdresse: ' + acceptedcustomstops[index][4],
                'icon': 'blue'
            }).then((marker) => {
                this.customstopsmarkers.push(marker);
            })
        };
    }

    /**
     * disables interactions with the map
     */
    disableInteraction() {
        this.map.setClickable(false);
    }

    /**
     * enables interactions with the map
     */
    enableInteraction() {
        this.map.setClickable(true);
    }

    /**
     * clears and removes the map
     */
    removeMap() {
        for (let i = 0; i < this.customstopsmarkers.length; i++) {
            this.customstopsmarkers[i].remove();
        }

        for (let i = 0; i < this.linestopsmarkers.length; i++) {
            this.linestopsmarkers[i].remove();
        }
        this.lineroutepolyline.remove();
        this.linestopscoordinates = [];
        this.linestopsnames = [];
        this.customstopsmarkers = [];
        this.map.clear();
        this.map.remove();
    }

    ngOnDestroy() {
        this.removeMap();
        while (this.mapElement.firstChild) {
            this.mapElement.removeChild(this.mapElement.firstChild);
        }
    }

    ngAfterViewInit() {
        this.loadMap();
    }
}