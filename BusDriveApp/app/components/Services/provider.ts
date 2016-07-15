import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class Provider {

    constructor(private http: Http) {
    }

    /**
     * posts realTimeData to server
     * @param busID ID of the selected bus
     * @param longitude Longitude of current position
     * @param latitude Latitude of current position
     * @param passangerscounter number of passangers in the bus
     * @param serverURL URL of the server
     */
    postRealTimeData(busID, longitude, latitude, passangerscounter, serverURL) {
        let timestamp = Date.now()
        let realTimeData = JSON.stringify(
            {
                "busId": busID,
                "position": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                },
                "takenSeats": passangerscounter,
                "timeStamp": timestamp
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', serverURL + "/realTimeData");
        senddata.setRequestHeader('Content-Type', 'application/json');
        senddata.send(realTimeData);
        console.log("Senden: " + "Bus: " + busID, " Latitude: " + latitude, " Longitude: " + longitude, "takenSeats: " + passangerscounter, "timeStamp: " + timestamp);
    }

    /**
     * posts updateBusStatus to server
     * @param busID ID of the selected bus
     * @param lineID ID of the selected line
     * @param serverURL URL of the server
     */
    postBusStatus(busID, lineID, serverURL) {
        let busStatus = JSON.stringify(
            {
                "lineId": lineID,
                "busId": busID
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', serverURL + "/updateBusStatus");
        senddata.setRequestHeader("Content-Type", "application/json");
        senddata.send(busStatus);
        console.log("Senden: " + "Bus: " + busID, " Line: " + lineID);
    }

    /**
     * posts CustomStopStatus
     * @param customstopID ID of the customstop
     * @param BusId ID of the selected bus
     * @param status status of the customstop 
     * @param serverURL URL of the server
     */
    postCustomStopStatus(CustomstopId, BusId, status, serverURL) {
        let customStopStatus = JSON.stringify(
            {
                "status": status,
                "busId": BusId
            })
        let senddata = new XMLHttpRequest();
        senddata.open('POST', serverURL + "/customStops/" + CustomstopId);
        senddata.setRequestHeader("Content-Type", "application/json");
        senddata.send(customStopStatus);
        console.log("Senden: " + " CustomstopID: " + CustomstopId, "Status: " + status);
        console.log("response: " + senddata.response, senddata.responseBody, senddata.responseText, senddata.responseText, senddata.responseType, senddata.responseXML)
    }
}