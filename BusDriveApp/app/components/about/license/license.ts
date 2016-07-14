import {Page, NavController, MenuController, Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
@Component({
  templateUrl: 'build/components/about/license/license.html',
    pipes: [TranslatePipe]
})

export class LicensePage {
  private nav;


  constructor(nav: NavController, private menu: MenuController) {
    this.nav = nav;
    this.menu.swipeEnable(false);
    
 
  }
}