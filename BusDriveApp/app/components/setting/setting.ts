import {Page, Storage, LocalStorage, Events, Alert, App} from 'ionic-angular';
import {Component} from '@angular/core';
import {Insomnia, BackgroundMode} from 'ionic-native';
import {language, de, en} from "../languages/languages";

@Component({
  templateUrl: 'build/components//setting/setting.html'
})

export class SettingPage {
  public serverURL;
  public serverURLListStorage;
  public serverURLList = [];
  public lang;
  public insomnia = true;
  public mode = true;

  public settings;

  //-----Language-----
  public langTrans;
  public cancelAlert;
  public serverAdressTrans;
  public newServerAdressTrans;
  public settingTrans;

  constructor(private app: App, public events: Events) {
    this.settings = window.localStorage;
    this.serverURL = this.getServerURL();
    this.lang = this.getLanguage();
    this.serverURLList = this.getServerURLList().split(",");
    this.serverURLListStorage = this.getServerURLList();
    this.insomnia = this.getInsomnia();
    this.mode = this.getBackgroundMode();

    //-----Language-----
    this.langTrans = language.langTrans;
    this.cancelAlert = language.alertCancel;
    this.serverAdressTrans = language.serveradressTrans;
    this.newServerAdressTrans = language.newServerTrans;
    this.settingTrans = language.settingTrans;

  }

  /**
   * creats prompt alert for new server URL
   */
  promptServerURL() {
    let prompt = Alert.create({
      title: this.newServerAdressTrans,
      message: "Enter a url for the server",
      inputs: [
        {
          name: 'URL',
          placeholder: 'URL'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.addToServerURLList(data.URL);
            console.log('Add clicked');
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
    this.serverURLListStorage = this.serverURLListStorage + "," + URL;
    this.settings.setItem("serverURLList", this.serverURLListStorage);
    this.serverURLList = this.getServerURLList().split(",");
  }

  /**
   * @retruns List of URLs from localStorage
   */
  getServerURLList() {
    return this.settings.getItem("serverURLList");
  }

  /**
   * clears List of URLs from localStorage
   */
  clearServerURLList() {
    this.serverURLListStorage = this.serverURL;
    this.settings.setItem("serverURLList", this.serverURL);
    this.serverURLList = this.getServerURLList().split(",");
  }

  /**
   * sets the GUI select as server url
   * @param URL url of the server
   */
  setServerURL(URL) {
    this.settings.setItem("serverURL", URL);
    this.events.publish("newServerURL", URL);
    console.log("set new server url: " + this.serverURL);
  }

  /**
   * @retruns url of the server from localStorage
   */
  getServerURL() {
    return this.settings.getItem("serverURL")
  }

  /**
   * sets the GUI input as GUI language
   * @param URL url of the server
   */
  setLanguage(lang) {
    this.settings.setItem("Language", lang);
    console.log("set new language: " + this.lang);
  }

  /**
   * @retruns language of GUI from localStorage
   */
  getLanguage() {
    return this.settings.getItem("Language")
  }

  /**
   * changes the gui-language 
   */
  changeLanguage(lang) {
    if (lang === "en") {
      language = en;
      this.setLanguage(lang);
    }
    else {
      language = de;
      this.setLanguage(lang);
    }
    this.events.publish("ChangeLanguage");
    this.langTrans = language.langTrans;
    this.cancelAlert = language.alertCancel;
    this.serverAdressTrans = language.serveradressTrans;
    this.newServerAdressTrans = language.newServerTrans;
    this.settingTrans = language.settingTrans;
    console.log("ChangeLanguage: " + lang);
  }

  /**
   * @param insomnia boolean
   * sets insomnia
   */
  setInsomnia(insomnia) {
    this.settings.setItem("insomnia", insomnia);
  }

  /**
   * gets insomnia
   */
  getInsomnia() {
    return this.settings.getItem("insomnia");
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
    console.log("prefent from falling asleep " + insomnia);
    this.setInsomnia(insomnia);
  }

  /**
   * @param mode boolean
   * sets BackgroundMode
   */
  setBackgroundMode(mode) {
    this.settings.setItem("BackgroundMode", mode);
  }

  /**
   * gets BackgroundMode
   */
  getBackgroundMode() {
    return this.settings.getItem("BackgroundMode");
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
}
