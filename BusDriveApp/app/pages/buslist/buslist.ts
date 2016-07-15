import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
import {Component} from '@angular/core';
import {LineListPage} from '../linelist/linelist';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
    templateUrl: 'build/pages/buslist/buslist.html',
    pipes: [TranslatePipe]
})

export class BusListPage {
    private bussesInfos = [];


    constructor(private nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface) {        
        this.getBussesInfos();
    }

    /**
     * gets id, numberplate and number of total seats of the busses as a list
     */
    getBussesInfos() {
        this.bussesInfos = this.busdriveinterface.getBussesInfos();
    }

    /**
     * passes the selected bus and the url of the server to LineListPage and switches the GUI to LineListPage
     * @param bus element of the buslist
     */
    selectBus(bus) {
        console.log("-> LineListPage");
        for (let index = 0; index < this.bussesInfos.length; index++) {
            if (this.bussesInfos[index] == bus) {
                this.nav.push(LineListPage, {
                    selectedbus: bus[0],
                });
                if (document.getElementById('linelist')) {
                    document.getElementById('linelist').style.visibility = '';
                }
            }
        }
    }
}
