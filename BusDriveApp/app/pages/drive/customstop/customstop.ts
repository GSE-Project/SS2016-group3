import {Page, NavParams, NavController, Platform, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {language} from "../../../components/languages/languages";
import {ViewChild} from  '@angular/core';
import {Map} from '../../../components/map/map';
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
    templateUrl: 'build/pages/drive/customstop/customstop.html',
    directives: [Map],
    pipes: [TranslatePipe]
})

export class CustomStopPage {

    @ViewChild(Map) map: Map;
    private customstop;
    private accepted;
    private priority: number = 50;

    //-----Language-----
    public title;
    public timeTrans;
    public addressTrans;
    public numberTrans;
    public decline;
    public accept;
    public done;
    public noAppearance;

    constructor(navParams: NavParams, private nav: NavController, public events: Events, private platform: Platform) {
        this.customstop = navParams.get("showcustomstop");
        this.accepted = navParams.get("accepted");
        this.platform.registerBackButtonAction(() => {
            if (this.nav.canGoBack()) {
                this.priority = 1;
                this.nav.pop();
                this.nav.remove();
            }
        }, this.priority);
        this.events.subscribe("mapLoaded", () => {
            let customstoplat = this.customstop[6][1];
            let customstoplng = this.customstop[6][0];
            let latlng = new google.maps.LatLng(customstoplat, customstoplng);
            this.map.setCustomstopPosition(latlng);
        });

        //-----Language-----
        this.title = language.customStopTitle;
        this.timeTrans = language.time;
        this.addressTrans = language.addressTrans;
        this.numberTrans = language.numberTrans;
        this.decline = language.decline;
        this.accept = language.accept;
        this.done = language.done;
        this.noAppearance = language.noAppearance;

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
