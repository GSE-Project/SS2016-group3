import {Component} from '@angular/core';
import {NavController, ViewController, Platform} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {SettingPage} from '../../../components/setting/setting';
import {AboutPage} from '../../../components/about/about'

@Component({
    templateUrl: 'build/pages/home/popover/popover.html',
    pipes: [TranslatePipe]
})
export class PopoverPage {
    constructor(private platform: Platform, private nav: NavController, private viewCtrl: ViewController) {

    }

    /**
     * opens setting page
     */
    openSettingPage() {
        console.log("-> SettingPage");
        this.viewCtrl.dismiss().then(() => {
            this.nav.push(SettingPage);
        })
    }

    /**
     * opens about page
     */
    openAboutPage() {
        console.log("-> SettingPage");
        this.viewCtrl.dismiss().then(() => {
            this.nav.push(AboutPage);
        });
    }

    /**
     * closes the app
     */
    closeApp() {
        this.platform.exitApp();
        LocalNotifications.clear(1);
    }
}
