import {Events} from 'ionic-angular';
import {Component, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Geolocation} from 'ionic-native';

@Component({
    selector: 'map',
    templateUrl: 'build/components/map/map.html'
})

export class Map implements AfterViewInit, OnDestroy {
    private map: google.maps.Map;
    private mapElement;
    private customstopsmarkers = [];
    private latlng: google.maps.LatLng;
    private customstopposition: google.maps.LatLng;

    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;

    constructor(private element: ElementRef, public events: Events) {

    }

    /**
     * loads Google Maps and shows its own position ( after you clicked the button )
     */
    loadMap() {
        console.log("started loading map");
        let options = { timeout: 10000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition((position) => {
            this.latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: this.latlng,
                zoom: 15,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: [
                        google.maps.MapTypeId.ROADMAP,
                        google.maps.MapTypeId.SATELLITE
                    ]
                },
                zoomControl: true,
                streetViewControl: false
            }
            this.mapElement = this.element.nativeElement.children[0];
            this.map = new google.maps.Map(this.mapElement, mapOptions);

            let geoloccontrol = new klokantech.GeolocationControl(this.map, 18);

            console.log("successfully loaded map");
            this.events.publish("mapLoaded");

            if (this.customstopposition) {
                this.directionsDisplay.setMap(this.map);
                this.calcCustomStopRoute(this.directionsService, this.directionsDisplay, this.customstopposition);
            }

        },
            (error) => {
                console.log("map could not be loaded", error);
            }, options
        );
    }

    /**
     * loads the route and shows it on the map
     * @param lineroutecoordinates list of coordinates of the lineroute
     */
    loadRoute(lineroutecoordinates) {
        let routepath = new google.maps.Polyline({
            path: lineroutecoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        routepath.setMap(this.map);
    }

    /**
     * loads the stops and shows them as a marker on the map
     * @param linestopscoordinates list of coordinates of the linetops
     * @param linestopsnames list of the names of the linetops
     */
    loadStops(linestopscoordinates, linestopsnames) {
        for (let index = 0; index < linestopscoordinates.length; index++) {
            let stopLatLng = new google.maps.LatLng(linestopscoordinates[index][1], linestopscoordinates[index][0]);
            let stopmarker = new google.maps.Marker({
                position: stopLatLng,
                map: this.map,
                label: linestopsnames[index]
            });
        };
    }

    /**
     * loads the custumstops and shows them as a marker on the map
     * @param acceptedcustomstops list of accepted customstops
     */
    loadCustomStops(acceptedcustomstops) {
        for (let i = 0; i < this.customstopsmarkers.length; i++) {
            this.customstopsmarkers[i].setMap(null);
        }
        this.customstopsmarkers = [];
        for (let index = 0; index < acceptedcustomstops.length; index++) {
            let customstopLatLng = new google.maps.LatLng(acceptedcustomstops[index][6][1], acceptedcustomstops[index][6][0]);
            let customstopmarker = new google.maps.Marker({
                position: customstopLatLng,
                map: this.map,
                label: acceptedcustomstops[index][1]
            });
            this.customstopsmarkers.push(customstopmarker);
        };
    }

    /**
     * calculates the route to a customstop 
     */
    calcCustomStopRoute(directionsService, directionsDisplay, customstopposition) {
        let start = this.latlng;
        let end = customstopposition;
        let request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                let route = response.routes[0];
            }
        });
    }

    /**
     * stest the customstopposition
     * @param customstopposition position of a customstop
     */
    setCustomstopPosition(customstopposition) {
        this.customstopposition = customstopposition;
    }

    /**
     * is called after map(component's) view, and its children's views, are created
     */
    ngAfterViewInit() {
        this.loadMap();
    }

    ngOnDestroy() {
        while (this.mapElement.firstChild) {
            this.mapElement.removeChild(this.mapElement.firstChild);
        }
    }
}