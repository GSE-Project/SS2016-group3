import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class Lines {
    private lines = [];

    constructor(private http: Http) {
    }

    /**
     * clears all lists
     */
    clearLists() {
        this.lines = [];
    }

    /**
     * requests lines from server
     */
    requestLines(serverURL) {
        return new Promise(resolve => {
            this.http.get(serverURL + "/lines").map(res => res.json()).subscribe(
                data => {
                    this.lines = data["lines"];
                    resolve(this.lines);
                },
                err => console.error('requestLines failed'),
                () => console.log('requestLines completed')
            );
        })
    }

    /**
     * @returns JSON of lines
     */
    getLines() {
        return this.lines;
    }

    /**
     * @returns id and name of the lines as a list of tuples
     */
    getLinesInfos() {
        let linesInfos = [];
        for (let i = 0; i < this.lines.length; i++) {
            linesInfos.push([this.lines[i].id, this.lines[i].name]);
        }
        return linesInfos;
    }
}
