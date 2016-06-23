import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomStops {
    private linecustomstops = [];

    constructor(private http: Http) {
    }

    /**
     * @param serverURL URL of the server
     * @param LineId id of the selected line
     * @retruns list of customstops of the line
     */
    requestLineCustomStops(serverURL, LineId) {
        this.http.get(serverURL + "/customStops?lineId=" + LineId).map(res => res.json()).subscribe(
            data => {
                this.linecustomstops = data;
            },
            err => console.error("requestLineCustomStops failed"),
            () => console.log('requestLineCustomStops completed')
        );
        for (let i = 0; i < this.linecustomstops.length; i++) {
            let assistance = [false, false, false, false, false];
            if (this.linecustomstops[i].userAssistance.length > 0) {
                this.linecustomstops[i].userAssistance.sort();
                for (let j = 0; j < this.linecustomstops[i].userAssistance.length; j++) {
                    if (this.linecustomstops[i].userAssistance[j] === 1) {
                        assistance.splice(0, 1, true);
                    }
                    else if (this.linecustomstops[i].userAssistance[j] === 2) {
                        assistance.splice(1, 1, true);
                    }
                    else if (this.linecustomstops[i].userAssistance[j] === 3) {
                        assistance.splice(2, 1, true);
                    }
                    else if (this.linecustomstops[i].userAssistance[j] === 4) {
                        assistance.splice(3, 1, true);
                    }
                    else if (this.linecustomstops[i].userAssistance[j] === 5) {
                        assistance.splice(4, 1, true);
                    }
                }
            }
            this.linecustomstops[i].userAssistance = assistance;
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
            linecustomstopsnames.push(this.linecustomstops[i].userName);
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
            linecustomstopsaddresses.push(this.linecustomstops[i].userAddress);
        }
        return linecustomstopsaddresses;
    }

    /**
     * @returns list of assistance of the linecustomstops
     */
    getLineCustomStopsAssistances() {
        let linecustomstopsassistances = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsassistances.push(this.linecustomstops[i].userAssistance);
        }
        return linecustomstopsassistances;
    }

    /**
     * @returns list of all information of the linecustomstops
     */
    getLineCustomStopsAll() {
        let linecustomstopsall = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsall.push([this.linecustomstops[i].id, this.linecustomstops[i].userName, this.linecustomstops[i].pickUpTime, this.linecustomstops[i].numberOfPersons, this.linecustomstops[i].userAddress, this.linecustomstops[i].userAssistance, this.linecustomstops[i].location.coordinates]);
        }
        return linecustomstopsall;
    }
}