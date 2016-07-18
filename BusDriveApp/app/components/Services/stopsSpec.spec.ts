/**
  stops specs
*/

import {Stops} from './stops';
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';


describe('Stops', function(){
    
let testData = {"stops": {
    stops: [
      {
        "id": 5,
        "name": "Uni West",
        "lines": [
          {
            "id": "2"
          }
        ],
        "location": {
          "type": "Point",
          "coordinates": [
            7.749317,
            49.424822
          ]
        },
        "schedule": [
          {
            "lineId": 2,
            "time": "12:00"
          },
          {
            "lineId": 2,
            "time": "13:00"
          },
          {
            "lineId": 2,
            "time": "9:00"
          }
        ]
      },
      {
        "id": 6,
        "name": "Uni Süd",
        "lines": [
          {
            "id": "2"
          }
        ],
        "location": {
          "type": "Point",
          "coordinates": [
            7.750694,
            49.423046
          ]
        },
        "schedule": [
          {
            "lineId": 2,
            "time": "12:00"
          },
          {
            "lineId": 2,
            "time": "13:00"
          },
          {
            "lineId": 2,
            "time": "9:00"
          }
        ]
      },
      {
        "id": 7,
        "name": "Uni Ost",
        "lines": [
          {
            "id": "2"
          }
        ],
        "location": {
          "type": "Point",
          "coordinates": [
            7.754991,
            49.423989
          ]
        },
        "schedule": [
          {
            "lineId": 2,
            "time": "12:00"
          },
          {
            "lineId": 2,
            "time": "13:00"
          },
          {
            "lineId": 2,
            "time": "9:00"
          }
        ]
      },
      {
        "id": 8,
        "name": "Uni Sporthalle",
        "lines": [
          {
            "id": "2"
          }
        ],
        "location": {
          "type": "Point",
          "coordinates": [
            7.750936,
            49.425893
          ]
        },
        "schedule": [
          {
            "lineId": 2,
            "time": "12:00"
          },
          {
            "lineId": 2,
            "time": "13:00"
          },
          {
            "lineId": 2,
            "time": "9:00"
          }
        ]
      }
    ],
    "timestamp": 2
  }};

let mockbackend: MockBackend, stopsMock: Stops;
    console.log("lines setup");
    //setup
    beforeEachProviders(() => [
      Stops,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (backend, options) => new Http(backend, options), 
        deps: [MockBackend, BaseRequestOptions]})
    ]);
  
  console.log("lines beforeEachProviders finished");

  beforeEach(inject([MockBackend, Stops], (_mockbackend, _stopsMock) => {
    mockbackend = _mockbackend;
    stopsMock = _stopsMock;
    
    console.log("lines create connection");
      mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({body:testData})));
    });
  }));

  
  console.log("finished setup");

    /**
     * tests if requestStops() returns testData 
     */
    it('should be requested', function(){

        stopsMock.requestStops("");
        console.log("stops:" +stopsMock.getStops());
        expect(stopsMock.getStops).not.toBe([]);        
    });

    /**
     * tests if getLineStop() does not return an empty list
     */
    it('should not return an empty stops list', function(){
        stopsMock.requestStops("");
        console.log("stops:" +stopsMock.getLineStops(1));
        expect(stopsMock.getLineStops(1)).not.toBe([]);        
    });

    /**
     * tests if getLineStopsNames() does not return an empty list
     */
    it('should not return an empty list of the names of stops', function(){
        stopsMock.requestStops("");
        console.log("stops:" + stopsMock.getLineStopsNames());
        expect(stopsMock.getLineStopsNames()).not.toBe([]);        
    });

    /**
     * tests if getLineStopsNames() does not return an empty list
     */
    it('should not return an empty list of the coordinates of stops', function(){
    
        stopsMock.requestStops("");
        console.log("stops:" +stopsMock.getLineStopsCoordinates());
        expect(stopsMock.getLineStopsCoordinates()).not.toBe([]);       
    });
});
