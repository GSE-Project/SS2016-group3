
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
        lineID: 1,//ZAHL
        color: "green",
        picture: "http://www.tm4.com/wp-content/uploads/2014/08/Foton-bus-12-m-e1407525133477.png",
        totalSeats: 7
         },
        {
        id: 2,
        numberPlate: "KL-CD678",
        lineID: 2,
        color: "red",
        picture: "http://littlebabybum.com/wp-content/uploads/2015/01/wheels-on-the-bus-red.png",
        totalSeats: 9
      }]};
    
   let mockbackend: MockBackend, bussesMock: Busses;
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
    bussesMock = _busses;

     console.log("busses create connection");

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body:response})));
    });

     bussesMock.requestBusses('http://localhost:3000')
  }));

  console.log("busses finished setup");
 
  //specs
	it('should load Bus entries',  () => {
    bussesMock.requestBusses("");
		expect(bussesMock.getBusses()).toEqual(
      [ Object({ id: 1, numberPlate: 'KL-AB345', lineID: 1, color: 'green', picture: 'http://www.tm4.com/wp-content/uploads/2014/08/Foton-bus-12-m-e1407525133477.png', totalSeats: 7 }), 
      Object({ id: 2, numberPlate: 'KL-CD678', lineID: 2, color: 'red', picture: 'http://littlebabybum.com/wp-content/uploads/2015/01/wheels-on-the-bus-red.png', totalSeats: 9 }) ]
    );
	});


  it ('should return the right seats number' , () => {
    bussesMock.requestBusses("");
    expect(bussesMock.getBusSeatsNumber(1)).toEqual(7);
    expect(bussesMock.getBusSeatsNumber(2)).toEqual(9);
  });

  it ('should return the right Busses Info' , () => {
    bussesMock.requestBusses("");
    expect(bussesMock.getBussesInfos()).toEqual(
      [ [ 1, 'KL-AB345', 7 ], [ 2, 'KL-CD678', 9 ] ]
    );
  });

  
});
