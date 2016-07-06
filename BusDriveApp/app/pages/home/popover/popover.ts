import {Component, ViewChild, ElementRef} from '@angular/core';
import {App, Popover, NavController, Content, NavParams} from 'ionic-angular';
import {SettingPage} from '../../../components/setting/setting';
import {AboutPage} from '../../../components/about/about';
import {TranslatePipe} from "ng2-translate/ng2-translate";
@Component({
  templateUrl: 'build/pages/home/popover/popover.html',
  pipes: [TranslatePipe]
})
export class PopoverPage{
    constructor(private nav: NavController) {

    }

    openSetting() {
        console.log("-> SettingPage");
        this.nav.push(SettingPage, {
        });
    }
    openAbout() {
        console.log("-> SettingPage");
        this.nav.push(AboutPage, {
        });
    }


}