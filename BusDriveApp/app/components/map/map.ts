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

            let mylocationmarker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: this.latlng,
                icon: "img/bus.png",
            });
            this.addMyLocationButton(this.map, mylocationmarker)
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
     * creates a myLocation button
     */
    addMyLocationButton(map, marker) {
        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0 0';
        secondChild.style.backgroundRepeat = 'no-repeat';
        firstChild.appendChild(secondChild);

        google.maps.event.addListener(map, 'center_changed', function () {
            secondChild.style['background-position'] = '0 0';
        });

        firstChild.addEventListener('click', function () {
            var imgX = '0',
                animationInterval = setInterval(function () {
                    imgX = imgX === '-18' ? '0' : '-18';
                    secondChild.style['background-position'] = imgX + 'px 0';
                }, 500);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(latlng);
                    map.setZoom(15);
                    clearInterval(animationInterval);
                    secondChild.style['background-position'] = '-144px 0';
                });
            } else {
                clearInterval(animationInterval);
                secondChild.style['background-position'] = '0 0';
            }
        });
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
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
                icon: "img/marker.png",
                title: acceptedcustomstops[index][1]
            });
            let customstopinfo = new google.maps.InfoWindow({
                content:
                '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h2>' + acceptedcustomstops[index][1] + '</h2>' +
                '<p> Abholzeit:' + acceptedcustomstops[index][2] + '</p>' +
                '<p> Anzahl:' + acceptedcustomstops[index][3] + '</p>' +
                '<p> Adresse:' + acceptedcustomstops[index][4] + '</p>' +
                '</div>' +
                '</div>'
            });
            customstopmarker.addListener('click', function () {
                customstopinfo.open(this.map, customstopmarker);
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