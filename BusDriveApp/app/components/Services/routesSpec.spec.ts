/**
  routes specs
*/

import {Routes} from './routes';
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';


describe('Routes', function(){
    
let testData = {routes: [
      {
        id: 1,
        route: {
          type: "LineString",
          coordinates: [
            [
              7.608858346939087,
              49.210420445650286
            ],
            [
              7.60828,
              49.21046
            ],
            [
              7.60671,
              49.20822
            ],
            [
              7.60588,
              49.20856
            ],
            [
              7.60545,
              49.20888
            ],
            [
              7.60531,
              49.20907
            ],
            [
              7.60497,
              49.21059
            ],
            [
              7.60501,
              49.21081
            ],
            [
              7.60513,
              49.21102
            ],
            [
              7.60556,
              49.21091
            ],
            [
              7.60585,
              49.21077
            ],
            [
              7.60624,
              49.21077
            ],
            [
              7.60645,
              49.21066
            ],
            [
              7.60668,
              49.21075
            ],
            [
              7.60713,
              49.21072
            ],
            [
              7.60836,
              49.211
            ],
            [
              7.61012,
              49.21087
            ],
            [
              7.61018,
              49.21072
            ],
            [
              7.6104,
              49.21067
            ],
            [
              7.61052,
              49.21016
            ],
            [
              7.61022,
              49.20911
            ],
            [
              7.61,
              49.20862
            ],
            [
              7.60939,
              49.20767
            ],
            [
              7.60917,
              49.20738
            ],
            [
              7.60887,
              49.20711
            ],
            [
              7.60812,
              49.20673
            ],
            [
              7.60721,
              49.20636
            ],
            [
              7.60699,
              49.2066
            ],
            [
              7.6051,
              49.20639
            ],
            [
              7.60378,
              49.2069
            ],
            [
              7.60229,
              49.20766
            ],
            [
              7.60209,
              49.20764
            ],
            [
              7.59759,
              49.2135
            ],
            [
              7.59904,
              49.21387
            ],
            [
              7.59962,
              49.21374
            ],
            [
              7.59983,
              49.21361
            ],
            [
              7.60071,
              49.21245
            ]
          ]
        }
      }
    ]
  };

 let mockbackend: MockBackend, routesMock: Routes;
    console.log("routes setup");
    //setup
    beforeEachProviders(() => [
      Routes,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (backend, options) => new Http(backend, options), 
        deps: [MockBackend, BaseRequestOptions]})
    ]);
    
    console.log("routes beforeEachProviders finished");

    beforeEach(inject([MockBackend, Routes], (_mockbackend, _routesMock) => {
      mockbackend = _mockbackend;
      routesMock = _routesMock;
      
      console.log("routes create connection");
        mockbackend.connections.subscribe(connection => {
       connection.mockRespond(new Response(new ResponseOptions({body:testData})));
      });

      routesMock.requestRoutes("");
    }));

    
    console.log("finished setup");

    
    
    it('should be requested', function(){
       
        console.log("routes: "+routesMock.getRoutes());
        expect(routesMock.getRoutes).not.toBe([]);        
    });

     it('should return the right Line Route CoordinatesNative', function(){
        // TBD        
    });

});
