import {Busses} from '../../app/components/Services/busses'
import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it,
} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';


describe('Service: TestService', () => {
  let mockbackend, service;
  /*beforeEachProviders(() => [
    Busses,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options), 
      deps: [MockBackend, BaseRequestOptions]})
  ]);

  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      Busses
    ];
  });
*/
let response =   {busses:  [
        {
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

  beforeEachProviders(() => [
    Busses,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);
  
  /*beforeEach(inject([XHRBackend, Busses], (_mockbackend, _service) => {
    mockbackend = _mockbackend;
    service = _service;
  }))*/

  console.log("create connection...");
  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    const baseResponse = new Response(new ResponseOptions({ body: response }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));
  
  //specs
  it('should request busses from server',  inject([Busses], (service: Busses) => {
    
    /*mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body:response})));
    });*/ 
    
    console.log("start request...");
    service.requestBusses("");
    console.log("finished test spec request");
    console.log(service.getBusses());
    expect(service.getBusses()).not.toEqual([]);
    
    }));
  });
