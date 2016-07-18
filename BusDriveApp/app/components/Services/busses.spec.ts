
import {Busses} from './busses';
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';



/**
  busses.ts service test
*/

describe("the process of getting available Bus entries from the Server",function(){
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
    
   let mockbackend: MockBackend, busses: Busses;
  console.log("busses setup spec")
  //setup
  beforeEachProviders(() => [
    Busses,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options), 
      deps: [MockBackend, BaseRequestOptions]})
  ]);
  
  console.log("busses beforeEachProviders done");

  beforeEach(inject([MockBackend, Busses], (_mockbackend, _busses) => {
    mockbackend = _mockbackend;
    busses = _busses;

     console.log("busses create connection");

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body:response})));
    });
  }));

  console.log("busses finished setup");
 
  //specs
	it('should load Bus entries',  () => {
  console.log("busses start request");
    busses.requestBusses('http://localhost:3000')
    console.log("busses finished request")
		expect(busses.getBusses()).not.toEqual([]);
	});
});
