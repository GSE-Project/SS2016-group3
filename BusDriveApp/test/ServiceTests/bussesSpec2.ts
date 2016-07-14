import {Busses} from '../../app/components/Services/busses'
import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';
import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from '@angular/http';

import {provide} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import {MockConnection} from '@angular/http/testing';
import {ResponseOptions} from '@angular/http';
import {Injector} from '@angular/core';

describe('Busses service', () => {
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

  // this block is required so that the test injector
  // is properly set up. Without doing this, you won't get the
  // fake backend injected into Http.

  // Also, you need to inject MockBackend as a provider before you wire
  // it to replace XHRBackend with the provide function!  So this is all
  // extremely important to set up right.

  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      Busses
    ];
  });


  it('should get buss entries', inject([XHRBackend, Busses], (mockBackend, busses) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: response
            }
          )));
      });

    busses.requestBusses("http://localhost:3000");
    expect(busses.getBusses()).not.toEqual([]);
    }));
  });
