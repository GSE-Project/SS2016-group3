import {App, Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Component, ViewChild} from '@angular/core';
import {HomePage} from './pages/home/home';
import {SettingPage} from './components/setting/setting';
import {AboutPage} from './components/about/about';
import {BusDriveInterface} from './components/Services/busdriveinterface';
import {Busses} from './components/services/busses';
import {Lines} from './components/services/lines';
import {Stops} from './components/services/stops';
import {Routes} from './components/services/routes';
import {Provider} from './components/services/provider';
import {CustomStops} from './components/services/customstops';
import {provide} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [BusDriveInterface, Busses, Lines, Stops, Routes, Provider, CustomStops, SettingPage]
})

export class MyApp {
  rootPage: any = HomePage;

  constructor(private platform: Platform, private settings: SettingPage) {
    this.initializeApp();
  }

  /**
   * initializes the app
   */
  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    this.settings.loadDefaultSettings();
  }
}

ionicBootstrap(MyApp, [[provide(TranslateLoader, {
  useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
  deps: [Http]
}),
  TranslateService]], {
  });