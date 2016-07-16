import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class Stops {
    private stops = [];
    private linestops = [];
    private linestopsschedules = [];

    constructor(private http: Http) {
    }

    /**
     * clears all lists
     */
    clearLists() {
        this.stops = [];
        this.linestops = [];
        this.linestopsschedules = [];
    }

    /**
      * requests stops from serverURL
      * @returns promise
      */
    requestStops(serverURL) {
        return new Promise(resolve => {
            this.http.get(serverURL + "/stops").map(res => res.json()).subscribe(
                data => {
                    this.stops = data["stops"];
                    resolve(this.stops);
                },
                err => console.error("requestStops failed"),
                () => console.log('requestStops completed')
            );
        });
    }

    /**
     * @returns JSON of lines
     */
    getStops() {
        return this.stops;
    }

    /**
     * @param LineId id of the selected line
     * @retruns stops of the line
     */
    getLineStops(LineId) {
        this.linestops = [];
        for (let i = 0; i < this.stops.length; i++) {
            for (let j = 0; j < this.stops[i].lines.length; j++) {
                if (LineId === parseInt(this.stops[i].lines[j].id)) {
                    this.linestops.push(this.stops[i]);
                    let linestopsarrivingtimes = [];
                    for (let k = 0; k < this.stops[i].schedule.length; k++) {
                        if ((LineId === this.stops[i].schedule[k].lineId) && (this.stops[i].id === this.stops[i].schedule[k].stopId)) {
                            linestopsarrivingtimes.push(this.stops[i].schedule[k].arrivingTime);
                        }
                    }
                    this.linestopsschedules.push(linestopsarrivingtimes);
                }
            }
        }
        return this.linestops;
    }

    /**
     * @retruns names of linestops
     */
    getLineStopsNames() {
        let linestopsnames = [];
        for (let i = 0; i < this.linestops.length; i++) {
            linestopsnames.push(this.linestops[i].name);
        }
        return linestopsnames;
    }

    /**
     * @returns coordinates of linestops
     */
    getLineStopsCoordinates() {
        let linestopscoordinates = [];
        for (let i = 0; i < this.linestops.length; i++) {
            linestopscoordinates.push(this.linestops[i].location.coordinates);
        }
        return linestopscoordinates;
    }

    /**
     * @returns names and schedules of linestops
     */
    getLineStopsInfos() {
        let linestopsinfos = [];
        for (let i = 0; i < this.linestops.length; i++) {
            linestopsinfos.push([this.linestops[i].name, this.linestopsschedules[i]]);
        }
        return linestopsinfos;
    }
}
