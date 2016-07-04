import {Page, NavParams, NavController, Platform, Events, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {language} from "../../../components/languages/languages";
import {ViewChild} from  '@angular/core';
import {NativeMap} from '../../../components/nativemap/nativemap';
import {GoogleMapsLatLng} from 'ionic-native';
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
    templateUrl: 'build/pages/drive/customstop/customstop.html',
    directives: [NativeMap],
    pipes: [TranslatePipe]
})

export class CustomStopPage {

    @ViewChild(NativeMap) nativemap: NativeMap;
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

    constructor(navParams: NavParams, private viewCtrl: ViewController, private nav: NavController, public events: Events, private platform: Platform) {
        document.getElementById('drivepage').style.visibility = 'hidden';
        document.getElementById('tabspage').style.visibility = 'hidden';
        // document.addEventListener('backbutton', this.dismiss.bind(this), false);
        this.customstop = navParams.get("showcustomstop");
        this.accepted = navParams.get("accepted");
        this.platform.registerBackButtonAction(this.dismiss.bind(this), this.priority);
        this.events.subscribe("mapLoaded", () => {
            let customstoplat = this.customstop[6][1];
            let customstoplng = this.customstop[6][0];
            let customstopposition = new GoogleMapsLatLng(customstoplat, customstoplng);
            this.nativemap.calcCustomStopRoute(customstopposition);
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
        this.dismiss();
    }

    /**
     * declines a customStop
     */
    declineCustomStop() {
        this.events.publish("decline", this.customstop);
        this.dismiss();
    }

    /**
     * completes a acceptedcustomstop with complete
     */
    completeAcceptedCustomStop() {
        this.events.publish("complete", this.customstop);
        this.dismiss();
    }

    /**
     * completes a acceptedcustomstop with noshow
     */
    noShowAcceptedCustomStop() {
        this.events.publish("noshow", this.customstop);
        this.dismiss();
    }

    /**
     * dismisses the modal
     */
    dismiss() {
        this.nativemap.clearCustomStop();
        if (document.getElementById('drivepage')) {
            document.getElementById('drivepage').style.visibility = '';
            document.getElementById('tabspage').style.visibility = '';
        }
        this.viewCtrl.dismiss();
        this.priority = 1;

    }
}
