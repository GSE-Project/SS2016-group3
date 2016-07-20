
import {Lines} from './lines';
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';

/**  
*  lines.ts service test
*/

describe("the process of getting available line entries from the server",function(){
    let testData = {lines: [
      {
        id: 1,
        name: "Pirmasens",
        routeRef: 1,
        busses: [
          1
        ]
      },
      {
        id: 2,
        name: "Uni",
        routeRef: 2,
        busses: [
          2
        ]
      }
    ]};
let mockbackend: MockBackend, linesMock: Lines;
    console.log("lines setup");
    //setup
    beforeEachProviders(() => [
      Lines,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (backend, options) => new Http(backend, options), 
        deps: [MockBackend, BaseRequestOptions]})
    ]);
  
  console.log("lines beforeEachProviders finished");

  beforeEach(inject([MockBackend, Lines], (_mockbackend, _linesMock) => {
    mockbackend = _mockbackend;
    linesMock = _linesMock;
    
    console.log("lines create connection");
      mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({body:testData})));
     });
  }));

  
  console.log("finished setup");


    it('should load Line entries', function(){
       
        linesMock.requestLines("");
        expect(linesMock.getLines()).toEqual(
          [ Object({ id: 1, name: 'Pirmasens', routeRef: 1, busses: [ 1 ] }), 
          Object({ id: 2, name: 'Uni', routeRef: 2, busses: [ 2 ] }) ]
        ); 

    })
 

    it('should return the right id and name of the lines as a list of tuples', function(){
        linesMock.requestLines("");
        expect(linesMock.getLinesInfos()).toEqual(
          [ [ 1, 'Pirmasens' ], [ 2, 'Uni' ] ]
        );
    });
})

