export class Language {
    //id: number;
    //name:string;
    //passengers:string;

    constructor(public id: number, public name: string, public driveTitle: string, public passengers: string, public numberplate: string, public seatsTrans: string,
        public chooseBus: string, public lineTitle: string, public lineName: string, public mapTitle: string, public stopTitle: string,
        public alertTitle: string, public alertCancel: string, public nextStop: string, public acceptedStops: string, public newStops: string,
        public time: string, public numberTrans: string, public done: string, public noAppearance: string, public accept: string, public decline: string,
        public addressTrans, public findUs: string, public opinion: string, public disclaimer: string,
        public imprint: string, public privacyPolicy: string, public license: string, public versionInfo: string, public beginTour: string,
        public backgroundModeTrans: string, public preventSleepTrans: string, public sendDist: string, public sendperiodTrans: string, public addTrans: string,
        public newServerTrans2: string,
        public langTrans: string, public serveradressTrans, public newServerTrans: string, public settingTrans: string, public about: string, public recieveddata: string, public customStopTitle: string) {

        this.id = id;
        this.name = name;
        this.driveTitle = driveTitle;
        this.passengers = passengers;
        this.numberplate = numberplate;
        this.seatsTrans = seatsTrans;
        this.chooseBus = chooseBus;
        this.lineTitle = lineTitle;
        this.mapTitle = mapTitle;
        this.stopTitle = stopTitle;
        this.alertTitle = alertTitle;
        this.alertCancel = alertCancel;
        this.lineName = lineName;
        this.nextStop = nextStop;
        this.acceptedStops = acceptedStops;
        this.newStops = newStops;

        //------- Custom Stops
        this.time = time;
        this.numberTrans = numberTrans;
        this.done = done;
        this.noAppearance = noAppearance;
        this.accept = accept;
        this.decline = decline;
        this.addressTrans = addressTrans;
        this.customStopTitle = customStopTitle;

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
        this.recieveddata = recieveddata;
        //------Settingspage-------
        this.backgroundModeTrans = backgroundModeTrans;
        this.preventSleepTrans = preventSleepTrans;
        this.sendDist = sendDist;
        this.sendperiodTrans = sendperiodTrans;
        this.addTrans = addTrans;
        this.newServerTrans2 = newServerTrans2;
        this.langTrans = langTrans;
        this.serveradressTrans = serveradressTrans;
        this.newServerTrans = newServerTrans;
        //------Sidemunu-----------
        this.settingTrans = settingTrans;
        this.about = about;

    }

}


export let en = new Language(0, "EN", "Drive", "Seats taken:", "Numberplate:", "Seats",
    "Choose bus", "Choose line", "Line", "Map", "Schedule", "End tour?", "Cancel", "Next stop:", "Accepted custom stops", "New custom stops",
    "Time", "Number", "Done", "No appearance", "Accept", "Decline", "Address", "Find us on", "Your opinion",
    "Disclaimer", "Imprint", "Privacy Policy", "License", "Version Info", "Start Tour",
    "Background mode", "Prevent sleeping", "Sending distance", "Sending period", "Add", "Enter a url for the server", "Language", "Serveraddress", "New serveraddress", "Settings", "About", "Communication problems: no received data", "Custom Stop");


export let de = new Language(1, "DE", "Fahren", "Belegte Plätze:", "Nummernschild", "Sitzplätze",
    "Wähle Bus aus", "Wähle Linie aus", "Linie", "Karte", "Fahrplan", "Fahrt beenden?", "Abbrechen", "Nächster Halt:", "Angenommene Haltestellen", "Neue Haltestellen",
    "Zeit", "Anzahl", "Ausgeführt", "Kein Erscheinen", "Akzeptieren", "Abblehnen", "Adresse", "Sie finden uns auf", "Ihre Meinung",
    "Rechtliches", "Impressum", "Datenschutzerklärung", "Lizenz", "Versionsinfo", "Tour starten",
    "Hintergrundmodus", "Schlafen verhindern", "Sendedistanz", "Sendeperiode", "Hinzufügen", "Geben sie eine Server-URL ein", "Sprache", "Serveradresse", "Neue Serveradresse", "Einstellungen", "Über uns", "Kommunikationsprobleme: keine empfangenen Daten", "Haltestelle");

export let language;

let settings = window.localStorage;
let lang = settings.getItem("Language");
if ("en" === lang) {
    language = en;
}
else {
    language = de
    settings.setItem("Language", "de");
}

export function changeLanguage(lang) {
    if ("en" === lang) {
        language = en;
    }
    else {
        language = de
    }
}
