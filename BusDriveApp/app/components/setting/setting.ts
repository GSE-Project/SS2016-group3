import {Page, Storage, SqlStorage, LocalStorage, Events, Alert, App} from 'ionic-angular';
import {Component} from '@angular/core';
import {Insomnia, BackgroundMode} from 'ionic-native';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";

@Component({
  templateUrl: 'build/components//setting/setting.html',
  pipes: [TranslatePipe]
})

export class SettingPage {
  public serverURL: string;
  public serverURLList: string[] = [];
  public lang: string;
  public insomnia: boolean;
  public mode: boolean;

  public settings: Storage;

  public cancelTrans;

  constructor(private app: App, public events: Events, public translate: TranslateService) {
    this.translate = translate;
    this.settings = new Storage(LocalStorage);
    this.serverURL = this.getServerURL();
    this.lang = this.getLanguage();
    this.serverURLList = this.getServerURLList();
    this.insomnia = this.getInsomnia();
    this.mode = this.getBackgroundMode();

    this.cancelTrans = translate.instant("cancelTrans");
  }

  /**
   * creats prompt alert for new server URL
   */
  addNewServerURL() {
    let prompt = Alert.create({
      title: this.translate.instant("setting.newServerAdressTrans"),
      message: this.translate.instant("setting.newServerTrans2"),
      inputs: [
        {
          name: 'URL',
          placeholder: 'URL'
        },
      ],
      buttons: [
        {
          text: this.translate.instant("setting.addTrans"),
          handler: data => {
            this.addToServerURLList(data.URL);
            console.log('Add clicked');
          }
        },
        {
          text: this.translate.instant("cancelTrans"),
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    let nav = this.app.getActiveNav();
    nav.present(prompt);
  }

  /**
   * adds the GUI input to server url list
   * @param URL url of the server
   */
  addToServerURLList(URL) {
    this.serverURLList.push(URL);
    this.settings.set("serverURLList", this.serverURLList);
  }

  /**
   * clears List of URLs from localStorage
   */
  clearServerURLList() {
    this.serverURLList = [];
    this.addToServerURLList(this.serverURL);
  }

  /**
   * @returns List of URLs from localStorage
   */
  getServerURLList() {
    this.getServerURLListFromStorage();
    return this.serverURLList
  }
  getServerURLListFromStorage() {
    return new Promise(resolve => {
      this.settings.get("serverURLList").then((URLList) => {
        if (URLList) {
          this.serverURLList = URLList.split(",");
        }
        resolve(this.serverURLList);
      });
    })
  }

  /**
   * sets the GUI select as server url
   * @param URL url of the server
   */
  setServerURL(URL) {
    this.settings.set("serverURL", URL).then(() => {
      this.events.publish("newServerURL", URL);
      console.log("set new server url: " + this.serverURL);
    });
  }

  /**
   * @returns url of the server from localStorage
   */
  getServerURL() {
    this.getServerURLFromStorage();
    return this.serverURL;
  }
  getServerURLFromStorage() {
    return new Promise(resolve => {
      this.settings.get("serverURL").then((URL) => {
        this.serverURL = URL;
        resolve(this.serverURL);
      });
    })
  }

  /**
   * sets the GUI input as GUI language in LocalStorage
   * @param lang language
   */
  setLanguage(lang) {
    this.settings.set("Language", lang).then(() => {
      console.log("set new language: " + this.lang);
    });
  }

  /**
   * @returns language of GUI from localStorage
   */
  getLanguage() {
    this.getLanguageFromStorage();
    return this.lang
  }
  getLanguageFromStorage() {
    return new Promise(resolve => {
      this.settings.get("Language").then((lang) => {
        this.lang = lang;
        resolve(this.lang);
      });
    })
  }

  /**
   * changes the gui-language 
   * @param lang language
   */
  changeLanguage(lang) {
    this.setLanguage(lang);
    this.translate.use(lang);
    this.events.publish("ChangeLanguage");
    this.cancelTrans = this.translate.instant("cancelTrans");
    console.log("ChangeLanguage: " + lang);
  }

  /**
   * @param insomnia boolean
   * sets insomnia
   */
  setInsomnia(insomnia) {
    this.settings.set("insomnia", insomnia);
  }

  /**
   * @returns insomnia
   */
  getInsomnia() {
    this.getInsomniaFromStorage();
    return this.insomnia;
  }
  getInsomniaFromStorage() {
    return new Promise(resolve => {
      this.settings.get("insomnia").then((insomnia) => {
        this.insomnia = insomnia;
        resolve(this.insomnia);
      });
    })
  }

  /**
   * changes insomnia
   */
  changeInsomnia(insomnia) {
    if (insomnia === true) {
      Insomnia.keepAwake()
        .then(
        () => console.log('prevent the screen from falling asleep'),
        () => console.log('failed to prevent the screen from falling asleep')
        );
    }
    else if (insomnia === false) {
      Insomnia.allowSleepAgain()
        .then(
        () => console.log('allow the screen to fall asleep'),
        () => console.log('failed to allow the screen to fall asleep')
        );
    }
    console.log("Insomnia " + insomnia);
    this.setInsomnia(insomnia);
  }

  /**
   * @param mode boolean
   * sets BackgroundMode
   */
  setBackgroundMode(mode) {
    this.settings.set("BackgroundMode", mode);
  }

  /**
   * returns BackgroundMode
   */
  getBackgroundMode() {
    this.getBackgroundModeFromStorage();
    return this.mode;
  }
  getBackgroundModeFromStorage() {
    return new Promise(resolve => {
      this.settings.get("BackgroundMode").then((mode) => {
        this.mode = mode;
        resolve(this.mode);
      });
    })
  }

  /**
   * changes BackgroundMode
   */
  changeBackgroundMode(mode) {
    if (mode === true) {
      BackgroundMode.enable();
    }
    else if (mode === false) {
      BackgroundMode.disable();
    }
    console.log("BackgroundMode " + mode);
    this.setBackgroundMode(mode);
  }

  /**
   *  loads default stettings
   */
  loadDefaultSettings() {
    this.settings.get("DefaultSettingsFlag").then((flag) => {
      if (!(flag === "false")) {
        this.setServerURL("https://digital-villages-server.herokuapp.com/services/rest/linemanagement/v1");
        this.serverURL = "https://digital-villages-server.herokuapp.com/services/rest/linemanagement/v1";
        this.addToServerURLList("https://digital-villages-server.herokuapp.com/services/rest/linemanagement/v1");
        this.setInsomnia("true");
        this.setBackgroundMode("true");
        this.setLanguage("de");
        this.settings.set("DefaultSettingsFlag", "false")
      }
    }).then(() => {
      this.getInsomniaFromStorage().then(() => {
        this.changeInsomnia(this.getInsomnia());
      })
      this.getBackgroundModeFromStorage().then(() => {
        this.changeBackgroundMode(this.getBackgroundMode());
      })
      this.getLanguageFromStorage().then(() => {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(this.getLanguage());
      })
    });
  }
}
