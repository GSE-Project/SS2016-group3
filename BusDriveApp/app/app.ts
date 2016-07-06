import {App, Platform, MenuController, Nav, Events, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Insomnia, LocalNotifications, BackgroundMode} from 'ionic-native';
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
  templateUrl: 'build/app.html',
  providers: [BusDriveInterface, Busses, Lines, Stops, Routes, Provider, CustomStops, SettingPage]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icon: string }>;

  //---------Language Support-----
  public settingTrans;
  public about;

  constructor(private platform: Platform, private menu: MenuController, public events: Events, public translate: TranslateService, private settings: SettingPage) {
    this.initializeApp();
    this.setPages();     
    this.events.subscribe("ChangeLanguage", () => {
      this.setPages();
    });
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
  
  /**
   * sets the pages of menu
   */
  setPages() {
    
    

    this.pages = [
      { title: 'Tour', component: HomePage, icon: 'bus' },
      { title:'Settings', component: SettingPage, icon: 'settings' },
      { title: 'About', component: AboutPage, icon: 'alert' }
    ];
  }

  /**
   * closes the menu when clicking a link from the menu and navigates to the new page if it is not the current page
   */
  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  /**
   * exits the app
   */
  exit() {
    this.platform.exitApp();
    LocalNotifications.clear(1);
  }
}

ionicBootstrap(MyApp, [[provide(TranslateLoader, {
  useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
  deps: [Http]
}),
  TranslateService]], {
  });