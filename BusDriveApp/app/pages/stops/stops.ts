import {Page, NavParams, Platform, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {language} from "../../components/languages/languages";
import {BusDriveInterface} from '../../components/Services/busdriveinterface';

@Component({
  templateUrl: 'build/pages/stops/stops.html',
})

export class StopsPage {
  private linestopsnames = [];
  private backbuttoncounter: number = 0;

  //-----Language-----
  public title;

  constructor(navParams: NavParams, private busdriveinterface: BusDriveInterface, private platform: Platform, public events: Events) {
    this.getLineStopsNames();

    this.platform.registerBackButtonAction(this.endTour.bind(this), 10);
    this.events.subscribe("endTourAborted", () => {
      this.backbuttoncounter = 0;
    })

    //-----Language-----
    this.title = language.stopTitle;
  }

  /**
   * gets the names of  linestops
   */
  getLineStopsNames() {
    this.linestopsnames = this.busdriveinterface.getLineStopsNames();
  }

  /**
   * ends the tour if confirmed
   */
  endTour() {
    if (this.backbuttoncounter === 0) {
      this.events.publish("EndTour");
    }
    this.backbuttoncounter = 1;
  }
}