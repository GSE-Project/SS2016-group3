import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomStops {
    private customstops = [];
    private linecustomstops = [];

    constructor(private http: Http) {
    }

    /**
      * requests customstops from server
      */
    requestCustomStops(serverURL) {
        this.http.get(serverURL + "/customstops").map(res => res.json()).subscribe(
            data => {
                this.customstops = data["customstops"];
            },
            err => console.error("requestCustomStops failed"),
            () => console.log('requestCustomStops completed')
        );

    }

    /**
     * @param LineId id of the selected line
     * @retruns list of customstops of the line
     */
    getLineCustomStops(LineId) {
        this.linecustomstops = [];
        for (let i = 0; i < this.customstops.length; i++) {
            if (LineId === this.customstops[i].lineId) {
                this.linecustomstops.push(this.customstops[i]);
            }
        }
        for (let i = 0; i < this.customstops.length; i++) {
            let assistance = [false, false, false, false, false];
            if (this.customstops[i].info.assistance.length > 0) {
                this.customstops[i].info.assistance.sort();
                for (let j = 0; j < this.customstops[i].info.assistance.length; j++) {
                    if (this.customstops[i].info.assistance[j] === 1) {
                        assistance.splice(0, 1, true);
                    }
                    else if (this.customstops[i].info.assistance[j] === 2) {
                        assistance.splice(1, 1, true);
                    }
                    else if (this.customstops[i].info.assistance[j] === 3) {
                        assistance.splice(2, 1, true);
                    }
                    else if (this.customstops[i].info.assistance[j] === 4) {
                        assistance.splice(3, 1, true);
                    }
                    else if (this.customstops[i].info.assistance[j] === 5) {
                        assistance.splice(4, 1, true);
                    }
                }
            }
            this.customstops[i].info.assistance = assistance;
        }
        return this.linecustomstops;
    }

    /**
     * @returns list of ids of linecustomstops
     */
    getLineCustomStopsIds() {
        let linecustomstopsids = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsids.push(this.linecustomstops[i].id);
        }
        return linecustomstopsids;
    }

    /**
     * @returns list of names of linecustomstops
     */
    getLineCustomStopsNames() {
        let linecustomstopsnames = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsnames.push(this.linecustomstops[i].info.name);
        }
        return linecustomstopsnames;
    }

    /**
     * @returns list of pick up times of the linecustomstops
     */
    getLineCustomStopPickUpTimes() {
        let linecustomstopspickuptimes = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopspickuptimes.push(this.linecustomstops[i].pickUpTime);
        }
        return linecustomstopspickuptimes;
    }

    /**
     * @returns list of coordinates of linecustomstops
     */
    getLineCustomStopsCoordinates() {
        let linecustomstopscoordinates = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopscoordinates.push(this.linecustomstops[i].location.coordinates);
        }
        return linecustomstopscoordinates;
    }

    /**
     * @returns list of number of persons of the linecustomstops
     */
    getLineCustomStopsNumberOfPersons() {
        let linecustomstopsnumberofpersons = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsnumberofpersons.push(this.linecustomstops[i].numberOfPersons);
        }
        return linecustomstopsnumberofpersons;
    }

    /**
     * @returns list of addresses of the linecustomstops
     */
    getLineCustomStopsAddresses() {
        let linecustomstopsaddresses = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsaddresses.push(this.linecustomstops[i].info.address);
        }
        return linecustomstopsaddresses;
    }

    /**
     * @returns list of assistance of the linecustomstops
     */
    getLineCustomStopsAssistances() {
        let linecustomstopsassistances = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsassistances.push(this.linecustomstops[i].info.assistance);
        }
        return linecustomstopsassistances;
    }

    /**
     * @returns list of all information of the linecustomstops
     */
    getLineCustomStopsAll() {
        let linecustomstopsall = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsall.push([this.linecustomstops[i].id, this.linecustomstops[i].info.name, this.linecustomstops[i].pickUpTime, this.linecustomstops[i].numberOfPersons, this.linecustomstops[i].info.address, this.linecustomstops[i].info.assistance, this.linecustomstops[i].location.coordinates]);
        }
        return linecustomstopsall;
    }
}