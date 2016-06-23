import {Events} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Busses} from '../../components/services/busses';
import {Lines} from '../../components/services/lines';
import {Stops} from '../../components/services/stops';
import {Routes} from '../../components/services/routes';
import {Provider} from '../../components/services/provider';
import {CustomStops} from '../../components/services/customstops';
import {SettingPage} from '../../components/setting/setting';

@Injectable()
export class BusDriveInterface {
        private serverURL;

    constructor(private http: Http, private setting: SettingPage, public events: Events, private busses: Busses, private lines: Lines, private stops: Stops, private routes: Routes, private provider: Provider, private customstops: CustomStops) {
        this.serverURL = setting.getServerURL();
        this.events.subscribe("newServerURL", (URL) =>{
            this.serverURL = URL;
            console.log("serverURl changed interface:" + URL)
        })
    }

    /**
     * requests busses from server
     */
    requestBusses() {
        this.busses.requestBusses(this.serverURL);
    }
    /**
     * @returns JSON of busses
     */
    getBusses() {
        return this.busses.getBusses();
    }

    /**
     * @returns id, numberplate and number of total seats of the busses as a list
     */
    getBussesInfos() {
        return this.busses.getBussesInfos();
    }

    /**
     * @param busId id of the selected bus
     * @returns number of total seats of the selected busses
     */
    getBusSeatsNumber(busId){
        return this.busses.getBusSeatsNumber(busId);
    }

    /**
     * requests lines from server
     */
    requestLines() {
        this.lines.requestLines(this.serverURL);
    }
    /**
     * @returns JSON of lines
     */
    getLines() {
        return this.lines.getLines();
    }

    /**
    * @returns id and name of the lines as a list of tuples
    */
    getLinesInfos() {
        return this.lines.getLinesInfos();
    }

    /**
     * requests stops from server
     */
    requestStops() {
        this.stops.requestStops(this.serverURL);
    }

    /**
     * @param LineId id of the selected line
     * @retruns stops of the line
     */
    getLineStops(LineId) {
        return this.stops.getLineStops(LineId);
    }

    /**
     * @retruns names of linestops
     */
    getLineStopsNames() {
        return this.stops.getLineStopsNames();
    }

    /**
     * @returns coordinates of linestops
     */
    getLineStopsCoordinates() {
        return this.stops.getLineStopsCoordinates();
    }

    /**
     * requests routes from server
     */
    requestRoutes() {
        this.routes.requestRoutes(this.serverURL);
    }

    /**
     * @param LineId id of the selected line
     * @retruns route of the line
     */
    getLineRoute(LineId) {
        return this.routes.getLineRoute(LineId);
    }

    /**
     * @retruns route of the line
     */
    getLineRouteCoordinates() {
        return this.routes.getLineRouteCoordinates();
    }

    /**
     * @retruns coordinates of the lineroute
     */
    getLineRouteCoordinatesNative() {
        return this.routes.getLineRouteCoordinatesNative();
    }

    /**
     * requests linecustomstops from server 
     * @param LineId id of the selected line
     */
    requestLineCustomStops(LineId) {
        this.customstops.requestLineCustomStops(this.serverURL, LineId);
    }

    /**
     * @returns list of ids of linecustomstops
     */
    getLineCustomStopsIds() {
        return this.customstops.getLineCustomStopsIds();
    }   

    /**
     * @returns list of names of linecustomstops
     */
    getLineCustomStopsNames() {
        return this.customstops.getLineCustomStopsNames();
    }

    /**
     * @returns list of pick up times of the linecustomstops
     */
    getLineCustomStopPickUpTimes(){
        return this.customstops.getLineCustomStopPickUpTimes();
    }

    /**
     * @returns list coordinates of linecustomstops
     */
    getLineCustomStopsCoordinates() {
        return this.customstops.getLineCustomStopsCoordinates();
    }

    /**
     * @returns list of number of persons of the linecustomstops
     */
    getLineCustomStopsNumberOfPersons(){
        return this.customstops.getLineCustomStopsNumberOfPersons();
    }

    /**
     * @returns list of addresses of the linecustomstops
     */
    getLineCustomStopsAddresses(){
        return this.customstops.getLineCustomStopsAddresses();
    } 

    /**
     * @returns list of assistance of the linecustomstops
     */
    getLineCustomStopsAssistances(){
        return this.customstops.getLineCustomStopsAssistances();
    }       

    /**
     * @returns lits of all information of the linecustomstops
     */
    getLineCustomStopsAll(){
        return this.customstops.getLineCustomStopsAll();
    } 
    /**
     * posts realTimeData to server
     * @param busID ID of the selected bus
     * @param longitude Longitude of current position
     * @param latitude Latitude of current position
     */
    postRealTimeData(busID, longitude, latitude, passangerscounter) {
        this.provider.postRealTimeData(busID, longitude, latitude, passangerscounter, this.serverURL);
    }

    /**
     * posts updateBusStatus to server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     */
    postBusStatus(busID, lineID) {
        this.provider.postBusStatus(busID, lineID, this.serverURL);
    }

    /**
     * posts CustomStopStatus
     * @param customstopID ID of the customstop
     * @param status status of the customstop 
     */
    postCustomStopStatus(customstopID, status){
        this.provider.postCustomStopStatus(customstopID, status, this.serverURL);
    }
}
