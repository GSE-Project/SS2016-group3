
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
        "location": {  "type": "Point",    "coordinates": [123.2 , 321.2]  },
        "numberOfPersons": 5,
        "deviceId": "asd",
        "status": 1, //follwoing standard s1 in server
        "info": {
            "name": "string",
            "address": "string",
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
            "acceptingBus": 1,
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
    //console.log("finished request. Got: "+ JSON.stringify(customStopsMock.get()));
  }));
  
  
  console.log("finished setup");
    
    /**
     * testing if getLineCustomStopsIds() does not return an empty list
     */
    it('should load the IDs of linecustomstops', function(){ 
      
       expect(customStopsMock.getLineCustomStopsIds()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsNames() does not return an empty list
     */
    it('should load the names of linecustomstops', function(){
      
      expect(customStopsMock.getLineCustomStopsNames()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopPickUpTimes() does not return an empty list
     */
    it('should load the pickuptimes of linecustomstops', function(){
      
      expect(customStopsMock.getLineCustomStopPickUpTimes()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsCoordinates() does not return an empty list
     */
    it('should load the coordinates of linecustomstops', function(){
      
      expect(customStopsMock.getLineCustomStopsCoordinates()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsNumberOfPersons() does not return an empty list
     */
    it('should load the number of persons', function(){
    
      expect(customStopsMock.getLineCustomStopsNumberOfPersons()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsAssistances() does not return an empty list
     */
    it('should load the adresses of linecustomstops', function(){
     
      expect(customStopsMock.getLineCustomStopsAddresses()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsAssistances() does not return an empty list
     */
    it('should load the assistances of linecustomstops', function(){
   
      expect(customStopsMock.getLineCustomStopsAssistances()).not.toEqual([]);
    });

    /**
     * testing if getLineCustomStopsAll() does not return an empty list
     */
    it('should load the list of linecustomstops containing all information', function(){
      
      expect(customStopsMock.getLineCustomStopsAll()).not.toEqual([]);
    });

    it('should add a zero to times < 10', function() {
    
      expect(customStopsMock.addZero(3)).toEqual("03");
    });
});
