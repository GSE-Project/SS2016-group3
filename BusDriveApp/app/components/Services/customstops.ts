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
     * clears all lists
     */
    clearLists() {
        this.linecustomstops = [];
    }

    /**
     * @param serverURL URL of the server
     * @param LineId id of the selected line
     * @retruns list of customstops of the line
     */
    requestLineCustomStops(serverURL, LineId) {
        return new Promise(resolve => {
            this.http.get(serverURL + "/customStops?lineId=" + LineId).map(res => res.json()).subscribe(
                data => {
                    this.linecustomstops = data;
                    resolve(this.linecustomstops);
                },
                err => console.error("requestLineCustomStops failed"),
                () => console.log('requestLineCustomStops completed')
            );
        })
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
        for (let i = 0; i < this.linecustomstops.length; i++) {
            let picuptime = new Date(this.linecustomstops[i].pickUpTime)
            let hours = this.addZero(picuptime.getHours());
            let minutes = this.addZero(picuptime.getMinutes());
            let day = this.addZero(picuptime.getDate());
            let month = this.addZero(picuptime.getMonth());
            let year = this.addZero(picuptime.getFullYear());
            let time = hours + ":" + minutes + " " + day + "." + month + "." + year;
            this.linecustomstops[i].pickUpTime = time;
            let assistance = [false, false, false, false, false];
            if (this.linecustomstops[i].info.assistance.length > 0) {
                this.linecustomstops[i].info.assistance.sort();
                for (let j = 0; j < this.linecustomstops[i].info.assistance.length; j++) {
                    if (this.linecustomstops[i].info.assistance[j] === 0) {
                        assistance.splice(0, 1, true);
                    }
                    else if (this.linecustomstops[i].info.assistance[j] === 1) {
                        assistance.splice(1, 1, true);
                    }
                    else if (this.linecustomstops[i].info.assistance[j] === 2) {
                        assistance.splice(2, 1, true);
                    }
                    else if (this.linecustomstops[i].info.assistance[j] === 3) {
                        assistance.splice(3, 1, true);
                    }
                    else if (this.linecustomstops[i].info.assistance[j] === 4) {
                        assistance.splice(4, 1, true);
                    }
                }
            }
            this.linecustomstops[i].info.assistance = assistance;
        }
        let linecustomstopsall = [];
        for (let i = 0; i < this.linecustomstops.length; i++) {
            linecustomstopsall.push([this.linecustomstops[i].id, this.linecustomstops[i].info.name, this.linecustomstops[i].pickUpTime, this.linecustomstops[i].numberOfPersons, this.linecustomstops[i].info.address, this.linecustomstops[i].info.assistance, this.linecustomstops[i].location.coordinates]);
        }
        return linecustomstopsall;
    }

    /**
     * adds 0 to times
     * @param time number
     * @returns time
     */
    addZero(time) {
        if (time < 10) {
            time = "0" + time;
        }
        return time;
    }
}