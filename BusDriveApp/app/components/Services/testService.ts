import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


//a simple service, equals Busses service
@Injectable()
export default class TestService {
  
  private busses = [];

  constructor(private http:Http) { }
  
  requestBusses(serverURL) {
        console.log("requestBusses called");
        console.log(this.http)
        this.http.get(serverURL + "/busses").map(res => res.json()).subscribe(
            data => {
                this.busses = data["busses"];
            },
            err => console.error('requestBusses failed'),
            () => console.log('requestBusses completed')
        );
    }

  getBusses(){
    return this.busses;
  }
}