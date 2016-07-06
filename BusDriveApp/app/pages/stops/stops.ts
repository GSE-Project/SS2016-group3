import {Page, NavParams, Platform, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
  templateUrl: 'build/pages/stops/stops.html',
    pipes: [TranslatePipe]
})

export class StopsPage {
  private linestopsinfos = [];
  private backbuttoncounter: number = 0;



  constructor(navParams: NavParams, private busdriveinterface: BusDriveInterface, private platform: Platform, public events: Events) {
    this.getLineStopsInfos();

    this.platform.registerBackButtonAction(this.endTour.bind(this), 10);
    this.events.subscribe("endTourAborted", () => {
      this.backbuttoncounter = 0;
    })

  }

  /**
   * gets the names and the schedules of linestops
   */
  getLineStopsInfos() {
    this.linestopsinfos = this.busdriveinterface.getLineStopsInfos();
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