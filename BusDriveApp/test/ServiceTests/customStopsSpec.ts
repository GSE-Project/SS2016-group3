
import {CustomStops} from '../../app/components/Services/customstops';
import {Http, Response, ResponseOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/RX';

/** 
 * Created by Erik
 * Edited by Oliver
 *  
 * customstops.ts service test
*/

describe("the process of getting available line entries from the server",function(){
    let testData = 
    {customstops: 
      [    
        {
            "id": 1,
            "lineId": 1,
            "pickUpTime": 1500 , //1098174234000 
            "location": {  "type": "Point",    "coordinates": [ 7.606974, 49.206611]  },
            "numberOfPersons": 3,
            "deviceID": 85757,
            "state": 3, //follwoing standard s1 in server
            "info": {
                "name": "Sascha",
                "address": "Uni Ost",
                "assistance": [] //following standard s2 in server
            }
        },

        {
            "id": 2,
            "lineId": 1,
            "pickUpTime": 1200 , //1098174234000 
            "location": {  "type": "Point",    "coordinates": [ 7.603509, 49.207039]  },
            "numberOfPersons": 1,
            "deviceID": 857547,
            "state": 2, //follwoing standard s1 in server
            "info": {
                "name": "Charel",
                "address": "Uni Sporthalle",
                "assistance": [2] //following standard s2 in server
            }
        },

                {
            "id": 3,
            "lineId": 1,
            "pickUpTime": 1430 , //1098174234000 
            "location": {  "type": "Point",    "coordinates": [ 7.600365, 49.209681]  },
            "numberOfPersons": 2,
            "deviceID": 8578547,
            "state": 1, //follwoing standard s1 in server
            "info": {
                "name": "Patrick",
                "address": "Uni West",
                "assistance": [1] //following standard s2 in server
            }
        }
      ]
    };


    let http = <Http> {
    get(url:string):Observable<Response>{
			let response:Response = new Response(
				new ResponseOptions({body:testData})
			);
			return Observable.of(response);
        }
     };

    /**  
        testing if the linecustomstops variable is not empty after getLineCustomStops()
    */
    it('should load customlinestops entries', function(done){
        let customStopsMock:CustomStops = new CustomStops(http);  //	TypeError: undefined is not a constructor
        expect(customStopsMock.requestLineCustomStops("", 1)).not.toEqual([]);

    });

    /**
     * testing if getLineCustomStopsIds() does not return an empty list
     */
    it('should load the ID of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestLineCustomStops("", 1);
      expect(customStopsMock.getLineCustomStopsIds).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsNames() does not return an empty list
     */
    it('should load the names of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      expect(customStopsMock.getLineCustomStopsNames).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopPickUpTimes() does not return an empty list
     */
    it('should load the pickuptimes of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestLineCustomStops("", 1);
      expect(customStopsMock.getLineCustomStopPickUpTimes()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsCoordinates() does not return an empty list
     */
    it('should load the coordinates of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestLineCustomStops("", 1);
      expect(customStopsMock.getLineCustomStopsCoordinates()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsNumberOfPersons() does not return an empty list
     */
    it('should load the number of persons', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestLineCustomStops("", 1);
      expect(customStopsMock.getLineCustomStopsNumberOfPersons()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsAssistances() does not return an empty list
     */
    it('should load the adresses of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestLineCustomStops("", 1);
      expect(customStopsMock.getLineCustomStopsAddresses()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsAssistances() does not return an empty list
     */
    it('should load the assistances of linecustomstops', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestLineCustomStops("", 1);
      expect(customStopsMock.getLineCustomStopsAssistances()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsAll() does not return an empty list
     */
    it('should load the list of linecustomstops containing all information', function(){
      let customStopsMock:CustomStops = new CustomStops(http);
      customStopsMock.requestLineCustomStops("", 1);
      expect(customStopsMock.getLineCustomStopsAll()).not.toEqual([]);
    });
})