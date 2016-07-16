/**
  Created by Erik Gruener
  Edited by Oliver Säger
  stops specs
*/

import {Stops} from './stops';
import {Http, ResponseOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/RX';


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

    let http = <Http> { 
            get(url:string):Observable<Response>{
			let response:Response = new Response(
				new ResponseOptions({body:testData})
			);
			return Observable.of(response);
        }
    };

    /**
     * tests if requestStops() returns testData 
     */
    it('should be requested', function(){
        let stopsMock = new Stops(http);
        stopsMock.requestStops("");
        expect(stopsMock.getLineStops(1)).toBe(testData);        
    });

    /**
     * tests if getLineStop() does not return an empty list
     */
    it('should not return an empty linestops list', function(){
        let stopsMock = new Stops(http);
        stopsMock.requestStops("");
        expect(stopsMock.getLineStops(1)).not.toBe([]);        
    });

    /**
     * tests if getLineStopsNames() does not return an empty list
     */
    it('should not return an empty list of the names of linestops', function(){
        let stopsMock = new Stops(http);
        stopsMock.requestStops("");
        expect(stopsMock.getLineStopsNames()).not.toBe([]);        
    });

    /**
     * tests if getLineStopsNames() does not return an empty list
     */
    it('should not return an empty list of the coordinates of linestops', function(){
        let stopsMock = new Stops(http);
        stopsMock.requestStops("");
        expect(stopsMock.getLineStopsCoordinates()).not.toBe([]);       
    });
});
