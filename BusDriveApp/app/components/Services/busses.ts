import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class Busses {
    private busses = [];

    constructor(private http: Http) {
    }

    /**
     * clears all lists
     */
    clearLists() {
        this.busses = [];
    }

    /**
     * requests busses from server
     */
    requestBusses(serverURL) {
        return new Promise(resolve => {
            this.http.get(serverURL + "/busses").map(res => res.json()).subscribe(
                data => {
                    this.busses = data["busses"];
                    resolve(this.busses);
                },
                err => console.error('requestBusses failed'),
                () => console.log('requestBusses completed')
            );
        })
    }

    /**
     * @returns JSON of busses
     */
    getBusses() {
        return this.busses;
    }

    /**
     * @param busId id of the selected bus
     * @returns number of total seats of the selected busses 
     */
    getBusSeatsNumber(busId) {
        return this.busses[busId - 1].totalSeats;
    }

    /**
     * @returns id, numberplate and number of total seats of the busses as a list
     */
    getBussesInfos() {
        let bussesInfos = [];
        for (let i = 0; i < this.busses.length; i++) {
            bussesInfos.push([this.busses[i].id, this.busses[i].numberPlate, this.busses[i].totalSeats]);
        }
        return bussesInfos;
    }
}
