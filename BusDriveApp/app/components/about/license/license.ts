import {Component} from '@angular/core';
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
  templateUrl: 'build/components/about/license/license.html',
  pipes: [TranslatePipe]
})

export class LicensePage {

  constructor() {
  }
}