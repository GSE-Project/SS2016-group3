import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class Routes {
    private routes = [];
    private lineroute = [];

    constructor(private http: Http) {
    }

    /**
     * clears all lists
     */
    clearLists() {
        this.routes = [];
        this.lineroute = [];
    }

    /**
     * requests routes from server
     * @returns promise
     */
    requestRoutes(serverURL) {
        return new Promise(resolve => {
            this.http.get(serverURL + "/routes").map(res => res.json()).subscribe(
                data => {
                    this.routes = data["routes"];
                    resolve(this.routes);
                },
                err => console.error("requestRoute failed"),
                () => console.log('requestRoute completed')
            );
        });
    }

    /**
     * @returns JSON of routes
     */
    getRoutes() {
        return this.routes;
    }
    /**
     * @param id of the selected line
     * @returns route of the line
     */
    getLineRoute(LineId) {
        this.lineroute = [];
        this.lineroute = this.routes[LineId - 1].route.coordinates;
        console.log("route " + LineId + " will be loaded");
        return this.lineroute;
    }

    /**
     * @returns coordinates of the lineroute
     */
    getLineRouteCoordinates() {
        let lineroutecoordinates = [];
        for (let index = 0; index < this.lineroute.length; index++) {
            lineroutecoordinates.push({
                lat: this.lineroute[index][1],
                lng: this.lineroute[index][0]
            })
        }
        console.log("GeoJson points of the route " + lineroutecoordinates.length);
        return lineroutecoordinates;
    }

    /**
     * @returns coordinates of the lineroute
     */
    getLineRouteCoordinatesNative() {
        let lineroutecoordinates = [];
        for (let index = 0; index < this.lineroute.length; index++) {
            lineroutecoordinates.push([
                this.lineroute[index][1],
                this.lineroute[index][0]
            ])
        }
        console.log("GeoJson points of the route " + lineroutecoordinates.length);
        return lineroutecoordinates;
    }
}
