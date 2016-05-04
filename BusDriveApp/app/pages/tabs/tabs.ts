import {Page, NavParams} from 'ionic-angular';
import {DrivePage} from '../drive/drive';
import {MapPage} from '../map/map';
import {StopsPage} from '../stops/stops';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  private stoplist;
  private tab1Root;
  private tab2Root;
  private tab3Root;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(navParams: NavParams) {
        this.stoplist = navParams.get("stoplist")
        this.tab1Root = DrivePage;
        this.tab2Root = MapPage;
        this.tab3Root = StopsPage;
    }
}
