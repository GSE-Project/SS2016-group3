import {App, Platform, MenuController, Nav, Events, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Insomnia, LocalNotifications, BackgroundMode} from 'ionic-native';
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

  constructor(private platform: Platform, private menu: MenuController, public events: Events,private  translate: TranslateService) {
    this.translateConfig();
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
    //Rufen wir schon früher auf
    
    let settings = window.localStorage;
    if (!(settings["serverURL"])) {
      settings.setItem("serverURL", "https://digital-villages-server.herokuapp.com/services/rest/linemanagement/v1");
      settings.setItem("serverURLList", "https://digital-villages-server.herokuapp.com/services/rest/linemanagement/v1");
      settings.setItem("insomnia", "true");
      settings.setItem("BackgroundMode", "true");
    }
    if (settings.getItem("insomnia") === "true") {
      Insomnia.keepAwake()
        .then(
        () => console.log('prevent the screen from falling asleep'),
        () => console.log('failed to prevent the screen from falling asleep')
        );
    }
    else if (settings.getItem("insomnia") === "false") {
      Insomnia.allowSleepAgain()
        .then(
        () => console.log('allow the screen to fall asleep'),
        () => console.log('failed to allow the screen to fall asleep')
        );
    }
    if (settings.getItem("BackgroundMode") === "true") {
      BackgroundMode.enable();
      console.log("BackgroundMode " + settings.getItem("BackgroundMode"));
      BackgroundMode.setDefaults({
        title: "BusDriveApp",
        text: "sending real time data"
      })
    }
    else if (settings.getItem("BackgroundMode") === "false") {
      BackgroundMode.disable();
      console.log("BackgroundMode " + settings.getItem("BackgroundMode"));
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
      { title:  this.translate.instant("setting.settingTrans"), component: SettingPage, icon: 'settings' },
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
    this.platform.exitApp();
    LocalNotifications.clear(1);
  }
  /**
   * configures the translation service (ng2-translate)
   */
translateConfig() {
  let userLang= "en";
  let settings = window.localStorage;
   if ((settings["Language"])) {
      userLang=settings.getItem("Language");
    }
   // var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    //userLang = /(en|de)/gi.test(userLang) ? userLang : 'en';

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(userLang);
  }

}

ionicBootstrap(MyApp, [[provide(TranslateLoader, {
  useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
  deps: [Http]
}),
  TranslateService]], {
});