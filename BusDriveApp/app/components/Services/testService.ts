import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


//a simple service
@Injectable()
export default class LanguagesServiceHttp {
  

  constructor(private http:Http) { }
  
  get(){
   return this.http.get('api/languages.json')
      .map(response => response.json());
    
  }
}