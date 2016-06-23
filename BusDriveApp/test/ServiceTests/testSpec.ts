import TestService from '../../app/components/Services/testService'
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';

describe('Service: TestService', () => {
  let mockbackend, service;
  
 //setup
  beforeEachProviders(() => [
    TestService,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options), 
      deps: [MockBackend, BaseRequestOptions]})
  ]);
  
  beforeEach(inject([MockBackend, TestService], (_mockbackend, _service) => {
    mockbackend = _mockbackend;
    service = _service;
  }))
  
  //specs
  it('should return available languages', done => {
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
      }
      ]};
    
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body:response})));
    });
    console.log("start request");
    
    service.requestBusses();
    expect(service.getBusses()).not.toEqual([]);
    console.log("finished test spec request");
    console.log(service.getBusses());
    done();
    });
  });
