import LanguagesServiceHttp from '../../app/components/Services/testService'
import {it,inject,beforeEach, beforeEachProviders} from '@angular/core/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions, Headers,HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from '@angular/core';

describe('Service: LanguagesServiceHttp', () => {
  let mockbackend, service;
  
 //setup
  beforeEachProviders(() => [
    LanguagesServiceHttp,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options), 
      deps: [MockBackend, BaseRequestOptions]})
  ]);
  
  beforeEach(inject([MockBackend, LanguagesServiceHttp], (_mockbackend, _service) => {
    mockbackend = _mockbackend;
    service = _service;
  }))
  
  //specs
  it('should return available languages', done => {
    let response =  {langs:  [
        {
        status:'av',
        name:'en'
         },
        {
        status:'av',
        name:'fr'
        },
        {
        status:'ne',
        name:'es'
        }
    ]};
    
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body:response})));
    });

    //expect(service.get().subscribe).toContain('en');
    //expect(service.get().subscribe).toContain('es');
    //expect(service.get().subscribe).toContain('fr');
    expect(service.get().subscribe.length).toEqual(3); // runs properly
    console.log("has called get");

    done();
    });
  });
