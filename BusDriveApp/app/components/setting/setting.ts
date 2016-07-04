import {Page, Storage, LocalStorage, Events, Alert, App} from 'ionic-angular';
import {Component} from '@angular/core';
import {Insomnia, BackgroundMode} from 'ionic-native';
import {changeLanguage, language, de, en} from "../languages/languages";
import {TranslatePipe,TranslateService} from "ng2-translate/ng2-translate";
@Component({
  templateUrl: 'build/components//setting/setting.html',
  pipes: [TranslatePipe]
})

export class SettingPage {
  public serverURL;
  public serverURLListStorage;
  public serverURLList = [];
  public lang;
  public insomnia = true;
  public mode = true;

  public settings;
  public cancelTrans;

  


  constructor(private app: App, public events: Events,public translate: TranslateService) {
    this.settings = window.localStorage;
    this.serverURL = this.getServerURL();
    this.lang = this.getLanguage();
    this.serverURLList = this.getServerURLList().split(",");
    this.serverURLListStorage = this.getServerURLList();
    this.insomnia = this.getInsomnia();
    this.mode = this.getBackgroundMode();
    this.translate = translate;
    this.cancelTrans=translate.instant("cancelTrans");
    
   

  }

  /**
   * creats prompt alert for new server URL
   */
  promptServerURL() {
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
      changeLanguage(lang);
      this.setLanguage(lang);
      this.translate.use("en");
    }
    else {
      changeLanguage(lang);
      this.setLanguage(lang);
       this.translate.use("de");
    }
    this.events.publish("ChangeLanguage");
    this.cancelTrans=this.translate.instant("cancelTrans");
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
