import {Page, Platform, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AppAvailability} from 'ionic-native';
import {language} from "../../components/languages/languages";
import {LicensePage} from "../../components/about/license/license";
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
    templateUrl: 'build/components/about/about.html',
    pipes: [TranslatePipe]
})

export class AboutPage {
    private platform;
    private nav;

    //----------Language-------
    private findUs;
    private opinion;
    private disclaimer;
    private imprint;
    private privacyPolicy;
    private license;
    private versionInfo;
    private aboutTrans;

    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        
        //----------Language--------------
        this.findUs = language.findUs;
        this.opinion = language.opinion;
        this.disclaimer = language.disclaimer;
        this.imprint = language.imprint;
        this.privacyPolicy = language.privacyPolicy;
        this.license = language.license;
        this.versionInfo = language.versionInfo;
        this.aboutTrans=language.about;

    }
    /**
     * opens a url in the system app if installed or in the browser
     * @param url url of the website
     */
    openURL(url) {
        this.platform.ready().then(() => {
            open(url, "_system", "location=true");
        });
    }

    /**
     * opens a url in the system app if installed or in the browser
     * @param url url of the website
     */
    openTwitter(url) {
        let app;
        if (this.platform.is('ios')) {
            app = 'twitter://';
        }
        else if (this.platform.is('android')) {
            app = 'com.twitter.android';
        }

        AppAvailability.check(app)
            .then(
            function () {  // Success callback
                window.open(url, '_system', 'location=no');
                console.log('Twitter is available');
            },
            function () {  // Error callback
                window.open(url, '_system', 'location=no');
                console.log('Twitter is not available');
            }
            );
    }

    /**
     * opens a url in the system app if installed or in the browser
     * @param url url of the website
     */
    openFacebook(url) {
        let app;
        if (this.platform.is('ios')) {
            app = 'fb://';
        }
        else if (this.platform.is('android')) {
            app = 'com.facebook.katana';
        }

        AppAvailability.check(app)
            .then(
            function () {  // Success callback
                window.open('fb://page/' + url, '_system', 'location=no');
                console.log('Facebook is available');
            },
            function () {  // Error callback
                window.open('https://www.facebook.com/' + url, '_system', 'location=no');
                console.log('Facebook is not available');
            }
            );
    }

    /**
     * opens a url in the system app if installed or in the browser
     * @param url url of the website
     */
    openYouTube(url) {
        let app;
        if (this.platform.is('ios')) {
            app = 'youtube://';
        }
        else if (this.platform.is('android')) {
            app = 'com.google.android.youtube';
        }

        AppAvailability.check(app)
            .then(
            function () {  // Success callback
                window.open(url, '_system', 'location=no');
                console.log('YouTube is available');
            },
            function () {  // Error callback
                window.open(url, '_system', 'location=no');
                console.log('YouTube is not available');
            }
            );
    }

    /**
     * opens the mail app with new email to "email"
     * @param email email adress for the message
     */
    mailto(email) {
        window.open(`mailto:${email}`, '_system');
    }

    /**
     * opens the LicensePage
     */
    openLicense() {
        console.log("-> LicensePage");
        this.nav.push(LicensePage, {
        });
    }

}