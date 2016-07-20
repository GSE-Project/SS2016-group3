import {Busses} from '../../app/components/Services/testService'
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
import {ResponseOptions, Http} from '@angular/http';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs/RX';


describe('Busses service', () => {
    
    let http: Http;
    
  it('should get buss entries', (done) => { 
   http = <Http>{
            get(url: string): Observable<Response> {
                var response: Response = new Response(
                    new ResponseOptions({ body: {busses:  [
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
                    }]}})
                );
                var answer: Observable<Response> = Observable.of(response);
                return answer;
            }
        };
    let bussesService:Busses = new Busses(http);
    bussesService.requestBusses("http://localhost:3000");
    expect(bussesService.getBusses()).not.toEqual([]);
    done();
    });
  });
