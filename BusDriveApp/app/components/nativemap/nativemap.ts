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

    private lineroutepolyline: GoogleMapsPolyline;
    private linestopsmarkers: GoogleMapsMarker[] = [];
    private customstopsmarkers: GoogleMapsMarker[] = [];

    private directionsService = new google.maps.DirectionsService;
    private customstoppolyline: GoogleMapsPolyline;
    private customstoppositionmarker: GoogleMapsMarker;

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
        this.map.clear(); // übergangslösung
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
        for (let index = 0; index < acceptedcustomstops.length; index++) {
            let customstopLatLng = new GoogleMapsLatLng(acceptedcustomstops[index][6][1], acceptedcustomstops[index][6][0]);
            this.map.addMarker({
                'position': customstopLatLng,
                'title': acceptedcustomstops[index][1],
                'snippet':
                'Abholzeit: ' + acceptedcustomstops[index][2] + '\nAnzahl: ' + acceptedcustomstops[index][3] + '\nAdresse: ' + acceptedcustomstops[index][4],
                'icon': 'green'
            }).then((marker) => {
                this.customstopsmarkers.push(marker);
                marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                    this.events.publish("LoadCustomStop");
                    this.calcCustomStopRoute(acceptedcustomstops[index]);
                });
            })
        };
    }

    /**
     * @param customstopposition lat,lng of a customstop
     * calculates the route to a customstop 
     */
    calcCustomStopRoute(customstop) {
        this.clearCustomStop();
        let customstoproutepath: GoogleMapsLatLng[] = [];
        let customstoplat = customstop[6][1];
        let customstoplng = customstop[6][0];
        let customstopposition = new GoogleMapsLatLng(customstoplat, customstoplng);
        let options = { timeout: 10000, enableHighAccuracy: true };
        Geolocation.getCurrentPosition(options).then((resp) => {
            let busposition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            let request = {
                origin: busposition,
                destination: customstopposition,
                travelMode: google.maps.TravelMode.DRIVING
            };
            this.directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    let polyline = new google.maps.Polyline();
                    let bounds = new google.maps.LatLngBounds();
                    let legs = response.routes[0].legs;

                    for (let i = 0; i < legs.length; i++) {
                        let steps = legs[i].steps;
                        for (let j = 0; j < steps.length; j++) {
                            let nextSegment = steps[j].path;
                            for (let k = 0; k < nextSegment.length; k++) {
                                polyline.getPath().push(nextSegment[k]);
                                bounds.extend(nextSegment[k]);
                                let routelatlnglist: any[] = nextSegment[k].toUrlValue(6).split(",")
                                let routelatlng = new GoogleMapsLatLng(parseFloat(routelatlnglist[0]), parseFloat(routelatlnglist[1]));
                                customstoproutepath.push(routelatlng);
                            }
                        }
                    }
                }
            });
            setTimeout(this.showCustomStopRoute.bind(this, customstoproutepath, customstopposition, customstop), 2000);
        });
    }

    /**
     * shows a polyline form own positiny to customstopposition
     */
    showCustomStopRoute(customstoproutepath, customstopposition, customstop) {
        if (customstop[7] === 1) {
            this.map.addMarker({
                'position': customstopposition,
                'title': customstop[1],
                'snippet':
                'Abholzeit: ' + customstop[2] + '\nAnzahl: ' + customstop[3] + '\nAdresse: ' + customstop[4],
                'icon': 'yellow'
            }).then((marker) => {
                this.customstoppositionmarker = marker;
            });
        }
        this.map.addPolyline({
            points: customstoproutepath,
            'geodesic': true,
            'visible': true,
            'color': '#0000ff',
            'width': 7
        }).then((polyline) => {
            this.customstoppolyline = polyline;
            polyline.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(() => {
                this.clearCustomStop();
            });
        });
        this.events.publish("CustomStopLoaded");
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
     * clears customstop route on the map
     */
    clearCustomStop() {
        if (this.customstoppolyline) {
            this.customstoppolyline.remove();
            this.customstoppositionmarker.remove();
        }
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
        this.customstopsmarkers = [];
        this.clearCustomStop();
        this.map.clear();
        this.map.remove();
    }

    ngOnDestroy() {
        while (this.mapElement.firstChild) {
            this.mapElement.removeChild(this.mapElement.firstChild);
        }
    }

    ngAfterViewInit() {
        this.loadMap();
    }
}