
import {Busses} from '../../app/components/Services/busses';
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';



/**
  busses.ts service test
*/

describe("the process of getting available Bus entries from the Server",function(){
	
   let mockbackend, busses;
  
  //setup
  beforeEachProviders(() => [
    Busses,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options), 
      deps: [MockBackend, BaseRequestOptions]})
  ]);
  
  beforeEach(inject([MockBackend, Busses], (_mockbackend, _busses) => {
    mockbackend = _mockbackend;
    busses = _busses;
  }))

  console.log("finished setup");
 
  //specs
	it('should load Bus entries',  done => {
      
      //'{"x":5}'
      let response =   {busses:  [{
        id: 1,
        numberPlate: "KL-AB345",
        color: "green",
        picture: "http://www.tm4.com/wp-content/uploads/2014/08/Foton-bus-12-m-e1407525133477.png"
         },
        {
        id: 2,
        numberPlate: "KL-CD678",
        color: "red",
        picture: "http://littlebabybum.com/wp-content/uploads/2015/01/wheels-on-the-bus-red.png"
      }]};
    
    console.log("create connection");

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body:response})));
    });

    console.log("start request");
    busses.requestBusses('http://localhost:3000')
    console.log("finished request")
		expect(busses.getBusses().not.toEqual([]));
	});
});
