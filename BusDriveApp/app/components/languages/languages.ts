export class Language {
    //id: number;
    //name:string;
    //passengers:string;

    constructor(public id: number, public name: string, public driveTitle: string, public passengers: string, public numberplate: string,
        public chooseBus: string, public lineTitle: string, public lineName: string, public mapTitle: string, public stopTitle: string,
        public alertTitle: string, public alertCancel: string,public nextStop:string,public acceptedStops:string,public newStops:string,
        public time:string,public numberTrans:string, public done:string, public noAppearance:string,public accept:string,public decline:string,
        public addressTrans,public findUs: string, public opinion: string, public disclaimer: string,
        public imprint: string, public privacyPolicy: string, public license: string, public versionInfo: string, public beginTour: string,
        public langTrans:string,public serveradressTrans,public newServerTrans:string, public settingTrans:string, public about:string) {

        this.id = id;
        this.name = name;
        this.driveTitle = driveTitle;
        this.passengers = passengers;
        this.numberplate = numberplate;
        this.chooseBus = chooseBus;
        this.lineTitle = lineTitle;
        this.mapTitle = mapTitle;
        this.stopTitle = stopTitle;
        this.alertTitle = alertTitle;
        this.alertCancel = alertCancel;
        this.lineName = lineName;
        this.nextStop=nextStop;
        this.acceptedStops=acceptedStops;
        this.newStops=newStops;
        this.time=time;
        this.numberTrans=numberTrans;
        this.done=done;
        this.noAppearance=noAppearance;
        this.accept=accept;
        this.decline=decline;
        this.addressTrans=addressTrans;

        //------- about-page
        this.findUs = findUs;
        this.opinion = opinion;
        this.disclaimer = disclaimer;
        this.imprint = imprint;
        this.privacyPolicy = privacyPolicy;
        this.license = license;
        this.versionInfo = versionInfo;
        //----------home screen------
        this.beginTour = beginTour;
        //------Settingspage-------
        this.langTrans=langTrans;
        this.serveradressTrans=serveradressTrans;
        this.newServerTrans=newServerTrans;
        //------Sidemunu-----------
        this.settingTrans=settingTrans;
        this.about=about;
        
    }

}


export var en = new Language(0, "EN", "Drive", "Seats taken:", "Numberplate:",
    "Choose bus", "Choose line", "Line", "Map", "Schedule", "End tour?", "Cancel","Next stop:","Accepted custom stops","New custom stops" ,
    "Time","Number","Done","No appearance","Accept","Decline","Address","Find us on", "Your opinion",
    "Disclaimer", "Imprint", "Privacy Policy", "License", "Version Info", "Start Tour","Language","Serveraddress","New serveraddress","Settings","About");


export var de = new Language(1, "DE", "Fahren", "Belegte Plätze:", "Nummernschild",
    "Wähle Bus aus", "Wähle Linie aus", "Linie", "Karte", "Fahrplan", "Fahrt beenden?", "Abbrechen", "Nächster Halt:","Angenommene Haltestellen","Neue Halstestellen",
    "Zeit","Anzahl","Ausgeführt","Kein Erscheinen","Akzeptieren","Abblehnen","Adresse", "Sie finden uns auf", "Ihre Meinung",
    "Rechtliches", "Impressum", "Datenschutzerklärung", "Lizenz", "Versionsinfo", "Tour starten","Sprache","Serveradresse","Neue Serveradresse","Einstellungen","Über uns");

export var language;
let settings = window.localStorage;
let lang = settings.getItem("Language");
if ("en" === lang) {
    language = en;
}
else {
    language = de
    settings.setItem("Language","de");
}

