import {Page, NavParams, NavController, Platform, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {language} from "../../../components/languages/languages";
import {ViewChild} from  '@angular/core';
import {Map} from '../../../components/map/map';

@Component({
    templateUrl: 'build/pages/drive/customstop/customstop.html',
    directives: [Map]
})

export class CustomStopPage {

    @ViewChild(Map) map: Map;
    private customstop;
    private accepted;

    //-----Language-----
    public title;

    constructor(navParams: NavParams, private nav: NavController, public events: Events) {
        this.customstop = navParams.get("showcustomstop");
        this.accepted = navParams.get("accepted");
        this.events.subscribe("mapLoaded", () => {
            let customstoplat = this.customstop[6][1];
            let customstoplng = this.customstop[6][0];
            let latlng = new google.maps.LatLng(customstoplat, customstoplng);
            this.map.setCustomstopPosition(latlng);
        });

        //-----Language-----
        this.title = language.stopTitle;
    }

    /**
     * accepts a customStop
     */
    acceptCustomStop() {
        this.events.publish("accept", this.customstop);
        this.nav.pop();
    }

    /**
     * declines a customStop
     */
    declineCustomStop() {
        this.events.publish("decline", this.customstop);
        this.nav.pop();
    }

    /**
     * completes a acceptedcustomstop with complete
     */
    completeAcceptedCustomStop() {
        this.events.publish("complete", this.customstop);
        this.nav.pop();
    }

    /**
     * completes a acceptedcustomstop with noshow
     */
    noShowAcceptedCustomStop() {
        this.events.publish("noshow", this.customstop);
        this.nav.pop();
    }
}
