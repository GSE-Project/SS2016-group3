import {Component, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {GoogleMap, GoogleMapsEvent, GoogleMapsMarker, GoogleMapsLatLng, GoogleMapsPolyline} from 'ionic-native';

@Component({
    selector: 'nativemap',
    templateUrl: 'build/components/nativemap/nativemap.html'
})

export class NativeMap implements OnDestroy {
    private map;
    private mapElement;
    private mapElementId;
    private customstopsmarkers = [];

    constructor(private element: ElementRef) {

    }

    /**
     * loads Google Maps and shows its own position ( after you clicked the button )
     */
    loadMap() {
        this.mapElementId = 'map' + new Date().getTime();
        this.mapElement = this.element.nativeElement.children[0];
        this.mapElement.setAttribute('id', this.mapElementId);
        this.map = new GoogleMap(this.mapElementId);
        this.map.setOptions({
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'zoom': true // Only for Android
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
        });
        this.centerCamera();
        console.log("successfully loaded map");
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
                'zoom': 18,
                'bearing': 0
            });
        })
    }

    /**
     * loads the route and shows it on the map
     * @param lineroutecoordinates list of coordinates of the lineroute
     */
    loadRoute(lineroutecoordinates) {
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
        });
    }

    /**
     * loads the stops and shows them as a marker on the map
     * @param linestopscoordinates list of coordinates of the linetops
     * @param linestopsnames list of the names of the linetops
     */
    loadStops(linestopscoordinates, linestopsnames) {
        for (let index = 0; index < linestopscoordinates.length; index++) {
            let stopLatLng = new GoogleMapsLatLng(linestopscoordinates[index][1], linestopscoordinates[index][0]);
            this.map.addMarker({
                'position': stopLatLng,
                'title': linestopsnames[index]
            })
        };
    }

    /**
     * loads the custumstops and shows them as a marker on the map
     * @param acceptedcustomstops list of accepted customstops
     */
    loadCustomStops(acceptedcustomstops) {
        for (let i = 0; i < this.customstopsmarkers.length; i++) {
            this.customstopsmarkers[i].remove();
            console.log("löschen "+ this.customstopsmarkers[i])
        }
        for (let index = 0; index < acceptedcustomstops.length; index++) {
            let customstopLatLng = new GoogleMapsLatLng(acceptedcustomstops[index][6][1], acceptedcustomstops[index][6][0]);
            this.map.addMarker({
                'position': customstopLatLng,
                'title': acceptedcustomstops[index][1],
                'icon': 'blue'
            }, function(marker) {
                this.customstopsmarkers.push(marker);
            });
                            console.log("marker "+ this.customstopsmarkers.length)
        };
    }

    ngOnDestroy() {
        while (this.mapElement.firstChild) {
            this.mapElement.removeChild(this.mapElement.firstChild);
        }
    }
}