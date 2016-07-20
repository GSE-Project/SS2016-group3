
import {Lines} from '../../app/components/Services/lines';
import {Http, Response, ResponseOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/RX';

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

    let http = <Http> {
    get(url:string):Observable<Response>{
			let response:Response = new Response(
				new ResponseOptions({body:testData})
			);
			return Observable.of(response);
        }
     };

    it('should load Line entries', function(done){
        let linesMock:Lines = new Lines(http);  //	TypeError: undefined is not a constructor
        linesMock.requestLines("");
        expect(linesMock.getLines()).not.toEqual([]);

    })


})