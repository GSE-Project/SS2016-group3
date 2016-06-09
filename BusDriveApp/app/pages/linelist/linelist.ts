import {Page, NavController, NavParams, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {BusDriveInterface} from '../../components/Services/busdriveinterface';
import {language} from "../../components/languages/languages";

@Page({
    templateUrl: 'build/pages/linelist/linelist.html'
})

export class LineListPage {
    private nav;
    private linesInfos = [];
    private selectedbus;

    //-----Language-----
    public lineName;
    public title;

    constructor(nav:NavController, navParams:NavParams, private busdriveinterface: BusDriveInterface, private menu: MenuController) {
        this.nav = nav;
        this.selectedbus = navParams.get("selectedbus")
        this.menu.swipeEnable(false);
        
        this.getLinesInfos();

        //-----Language-----
        this.lineName = language.lineName;
        this.title = language.lineTitle;
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
    navigate(line) {
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
}
