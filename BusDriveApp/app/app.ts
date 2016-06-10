import {App, Platform, MenuController, Nav, Events, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Component, ViewChild} from '@angular/core';
import {HomePage} from './pages/home/home';
import {SettingPage} from './components/setting/setting';
import {AboutPage} from './components/about/about';
import {language} from "./components/languages/languages";
import {BusDriveInterface} from './components/Services/busdriveinterface';
import {Busses} from './components/services/busses';
import {Lines} from './components/services/lines';
import {Stops} from './components/services/stops';
import {Routes} from './components/services/routes';
import {Provider} from './components/services/provider';
import {CustomStops} from './components/services/customstops';


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
  
  constructor(private platform: Platform, private menu: MenuController, public events: Events) {
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
    let settings = window.localStorage;
    if (!(settings["serverURL"])) {
      settings.setItem("serverURL", "http://localhost:3000");
      settings.setItem("serverURLList", "http://localhost:3000")
    }
  }
  
  /**
   * sets the pages of menu
   */
  setPages() {
    this.settingTrans = language.settingTrans;
    this.about = language.about;
    this.pages = [
      { title: 'Tour', component: HomePage, icon: 'bus' },
      { title: this.settingTrans, component: SettingPage, icon: 'settings' },
      { title: this.about, component: AboutPage, icon: 'alert' }
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
    this.platform.exitApp()
  }
}

ionicBootstrap(MyApp);