import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class Lines {
    private lines = [];

    constructor(private http: Http) {
    }

    /**
     * requests lines from server
     */
    requestLines(serverURL) {
        this.http.get(serverURL + "/lines").map(res => res.json()).subscribe(
            data => {
                this.lines = data["lines"];
            },
            err => console.error('requestLines failed'),
            () => console.log('requestLines completed')
        );
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