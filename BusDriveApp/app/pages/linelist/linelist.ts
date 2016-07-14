import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
import {Component} from '@angular/core';
import {TabsPage} from '../tabs/tabs';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
@Component({
    templateUrl: 'build/pages/linelist/linelist.html',
    pipes: [TranslatePipe]
})

export class LineListPage {
    private nav;
    private linesInfos = [];
    private selectedbus;


    constructor(nav: NavController, navParams: NavParams, private busdriveinterface: BusDriveInterface) {
        this.nav = nav;
        this.selectedbus = navParams.get("selectedbus")

        this.getLinesInfos();

    }

    /**
     * gets id and name of the lines as a list of tuples
     */
    getLinesInfos() {
        this.linesInfos = this.busdriveinterface.getLinesInfos();
    }

    /**
     * passes the selected line, the selected bus and the url of the server to TabsPage and switches the GUI to DrivePage
     * @param line element of the linelist
     */
    selectLine(line) {
        console.log("-> DrivePage");
        for (var index = 0; index < this.linesInfos.length; index++) {
            if (this.linesInfos[index] == line) {
                this.nav.push(TabsPage, {
                    selectedline: line[0],
                    selectedbus: this.selectedbus,
                });

            }
        }
    }

    /**
     * hides LineListPage ( solves the bug with native map )
     */
    ionViewDidLeave() {
        document.getElementById('linelist').style.visibility = 'hidden';
    }
}
