/**
  stops specs
*/

import {Stops} from './stops';
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';


describe('Stops', function(){
    
let testData = {
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
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "12:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "13:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "9:00:00"
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
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "12:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "13:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "9:00:00"
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
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "12:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "13:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "9:00:00"
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
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "12:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "13:00:00"
          },
          {
            "lineName": "Line Two",
            "lineId": 2,
            "arrivingTime": "9:00:00"
          }
        ]
      }
    ],
    "timestamp": 2
  };

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

    stopsMock.requestStops("");

  }));

  
  console.log("finished setup");

    /**
     * tests if requestStops() returns testData 
     */
    it('should be requested', function(){
       
        expect(stopsMock.getStops()).toEqual(  
         Object({ 
            stops: [ Object({ id: 5, name: 'Uni West', lines: [ Object({ id: '2' }) ], 
            location: Object({ type: 'Point', coordinates: [ 7.749317, 49.424822 ] }), 
            schedule: [ Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '12:00:00' }), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '13:00:00' }), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '9:00:00' }) ] }), Object({ id: 6, name: 'Uni Süd', lines: [ Object({ id: '2' }) ],
            location: Object({ type: 'Point', coordinates: [ 7.750694, 49.423046 ] }), 
            schedule: [ Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '12:00:00'}), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '13:00:00' }), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '9:00:00' }) ] }), Object({ id: 7, name: 'Uni Ost', lines: [ Object({ id: '2' }) ], 
            location: Object({ type: 'Point', coordinates: [ 7.754991, 49.423989 ] }), 
            schedule: [ Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '12:00:00' }), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '13:00:00' }), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '9:00:00' }) ] }), Object({ id: 8, name: 'Uni Sporthalle', lines: [ Object({ id: '2' }) ], 
          location: Object({ type: 'Point', coordinates: [ 7.750936, 49.425893 ] }), 
          schedule: [ Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '12:00:00' }), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '13:00:00' }), Object({ lineName: 'Line Two', lineId: 2, arrivingTime: '9:00:00' }) ] }) ], 
          timestamp: 2 })          
        );        
    });

    /**
     * tests if getLineStop() does not return an empty list
     */
    it('should return the right stops list', function(){
       console.log(stopsMock.getLineStops('2'));
        expect(stopsMock.getLineStops('2')).not.toEqual([]);        
    });

    /**
     * tests if getLineStopsNames() does not return an empty list
     */
    it('should return the right list of the names of stops', function(){
        console.log(stopsMock.getLineStopsNames());
        expect(stopsMock.getLineStopsNames()).not.toEqual([]);        
    });

    /**
     * tests if getLineStopsNames() does not return an empty list
     */
    it('should return the right list of the coordinates of stops', function(){
        console.log(stopsMock.getLineStopsCoordinates());
        expect(stopsMock.getLineStopsCoordinates()).not.toEqual([]);       
    });


    it('should return the right line stop infos', function(){
         console.log(stopsMock.getLineStopsInfos());
         expect(stopsMock.getLineStopsInfos()).not.toEqual([]);
    });
    
});
