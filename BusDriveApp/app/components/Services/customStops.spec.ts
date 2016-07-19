
import {CustomStops} from './customstops';
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';
/** 
 * customstops.ts service test
*/

describe("the process of getting available customsStops from the server",function(){
  console.log("init customsstopsspec");
    let testData = {
      customstops: 
      [    
        {
        "id":1,
        "lineId": 1,
        "acceptingBus": 1,
        "pickUpTime": 1098174234000 , //1098174234000 
        "location": {  "type": "Point",    "coordinates": [7.603509 , 48.207039]  },
        "numberOfPersons": 5,
        "deviceId": "asd",
        "status": 1, //follwoing standard s1 in server
        "info": {
            "name": "Sascha",
            "address": "asdStr. 5",
            "assistance": [1,2] //following standard s2 in server
        }
    },

        {
            "id": 2,
            "lineId": 1,
            "acceptingBus": 1,
            "pickUpTime": 1200 , //1098174234000 
            "location": {  "type": "Point",    "coordinates": [ 7.603509, 49.207039]  },
            "numberOfPersons": 1,
            "deviceId": 857547,
            "status": 2, //follwoing standard s1 in server
            "info": {
                "name": "Charel",
                "address": "asdStr. 7",
                "assistance": [2] //following standard s2 in server
            }
        },

                {
            "id": 3,
            "lineId": 1,
            "acceptingBus": 1,
            "pickUpTime": 1430 , //1098174234000 
            "location": {  "type": "Point",    "coordinates": [ 7.600365, 50.209681]  },
            "numberOfPersons": 2,
            "deviceID": 8578547,
            "status": 1, //follwoing standard s1 in server
            "info": {
                "name": "Patrick",
                "address": "asdStr. 8",
                "assistance": [1] //following standard s2 in server
            }
        }
      ]
    };

    let mockbackend: MockBackend, customStopsMock: CustomStops;
    console.log("customstops setup");
    //setup
    beforeEachProviders(() => [
      CustomStops,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (backend, options) => new Http(backend, options), 
        deps: [MockBackend, BaseRequestOptions]})
    ]);
  
  console.log("customstops beforeEachProviders finished");

  beforeEach(inject([MockBackend, CustomStops], (_mockbackend, _customStopsMock) => {
    mockbackend = _mockbackend;
    customStopsMock = _customStopsMock;
    
    
    console.log("customstops create connection");
      mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({body:testData})));
       });
    

    console.log("customstops request data");
    customStopsMock.requestLineCustomStops("", 1, 1);
    
  }));
  
  
  console.log("finished setup");
    
    /**
     * testing if getLineCustomStopsIds() does not return an empty list
     */
    it('should load the IDs of linecustomstops', function(){ 
       console.log("linecustomstopsids:"+customStopsMock.getLineCustomStopsIds());
       expect(customStopsMock.getLineCustomStopsIds()).toEqual([1,2,3]);
    });

    /**
     * testing if getLineCustomStopsNames() does not return an empty list
     */
    it('should load the names of linecustomstops', function(){
      console.log("linecustomstopsnames:"+customStopsMock.getLineCustomStopsNames());

      expect(customStopsMock.getLineCustomStopsNames()).toEqual(["Sascha","Charel","Patrick"]);
    });

    /**
     * testing if getLineCustomStopPickUpTimes() does not return an empty list
     */
    it('should load the pickuptimes of linecustomstops', function(){
      console.log("linecustomstoppickuptimes:"+customStopsMock.getLineCustomStopPickUpTimes());
      expect(customStopsMock.getLineCustomStopPickUpTimes()).toEqual([1098174234000, 1200, 1430]);
    });

    /**
     * testing if getLineCustomStopsCoordinates() does not return an empty list
     */
    it('should load the coordinates of linecustomstops', function(){
      console.log("linecustomstopsCoordinated:"+customStopsMock.getLineCustomStopsCoordinates());
      expect(customStopsMock.getLineCustomStopsCoordinates()).toEqual([ [ 7.603509, 48.207039 ], [ 7.603509, 49.207039 ], [ 7.600365, 50.209681 ] ]);
    });

    /**
     * testing if getLineCustomStopsNumberOfPersons() does not return an empty list
     */
    it('should load the number of persons', function(){
      console.log("linecustomstopsnumberofpersonns:"+customStopsMock.getLineCustomStopsNumberOfPersons());

      expect(customStopsMock.getLineCustomStopsNumberOfPersons()).toEqual([5,1,2]);
    });

    /**
     * testing if getLineCustomStopsAssistances() does not return an empty list
     */
    it('should load the adresses of linecustomstops', function(){
      console.log("linecustomstopsAdresses:"+customStopsMock.getLineCustomStopsAddresses());
   
      expect(customStopsMock.getLineCustomStopsAddresses()).toEqual(["asdStr. 5","asdStr. 7","asdStr. 8"]);
    });

    /**
     * testing if getLineCustomStopsAssistances() does not return an empty list
     */
    it('should load the assistances of linecustomstops', function(){
      console.log("linecustomstopsAssistances:"+customStopsMock.getLineCustomStopsAssistances());
      expect(customStopsMock.getLineCustomStopsAssistances()).toEqual([[1,2],[2],[1]]);
    });

    /**
     * testing if getLineCustomStopsAll() does not return an empty list
     */
    it('should load the list of linecustomstops containing all information', function(){
      console.log("linecustomstopsAll:"+String(customStopsMock.getLineCustomStopsAll()));
      // not testable because of code structure.. Cast JSON in later iteration
    });

    it('should add a zero to times < 10', function() {
     
      expect(customStopsMock.addZero(3)).toEqual("03");
    });
});
