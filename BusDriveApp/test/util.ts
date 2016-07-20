import {Http, Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';


export default Assert;

export class Assert {

    /**
     * Tests if the JSON representation of two objects is equal (we don't need the exact reference but only an equal)
     * @author sholzer 160511 (I wanted an Junit equivalent of assertEquals())
     * @param input :any an object
     * @param expectation :any the object input is expected to be equal
     * @param msg string failure message
     * @return void. Calls fail() if JSON.stringify(input) != JSON.stringify(expectation)
     */
    static equalJson(input: any, expectation: any, msg: string = ''): void {
        if (JSON.stringify(input) !== JSON.stringify(expectation)) {
            fail(msg + ', Expected\n' + JSON.stringify(input) + '\nto be equal to\n' + JSON.stringify(expectation));
        }
    }

    /**
     * Tests if the JSON representation of two objects is  NOT equal (we don't need the exact reference but only an equal)
     * @author sholzer 160511 (I wanted an Junit equivalent of assertEquals())
     * @param input :any an object
     * @param expectation :any the object input is expected NOT to be equal
     * @return void. Calls fail() if JSON.stringify(input) == JSON.stringify(expectation)
     */
    static notEqualJson(input: any, expectation: any): void {
        if (JSON.stringify(input) === JSON.stringify(expectation)) {
            fail('Expected\n' + JSON.stringify(input) + '\nNOT to be equal to\n' + JSON.stringify(expectation));
        }
    }
}