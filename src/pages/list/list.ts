import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowPage } from '../show/show';

import {SQLite, Camera, Geolocation} from 'ionic-native';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public db: SQLite;
  public lat: any;
  public long: any;
  public city: any;
  selectedItem: any;
  items: Array<Object>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
      // Banco de dados
      this.db = new SQLite();
      this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
         this.loadList();
      }, (error) => {
         alert("ERROR: " + error);
      });

      // Geolocation
      var options = { timeout: 30000, enableHighAccuracy: true, maximumAge: 10000 };
      Geolocation.getCurrentPosition(options).then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      // Request City
      // http://www.gps-coordinates.net/
      this.lat = "-22.8858975"
      this.long = "-43.115221099999985"
      let url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ this.lat +","+ this.long +"&sensor=true";
      this.http.get(url).map(res => res.json()).subscribe(data => {
        this.city = data['results'][0]['address_components'][1]['long_name'];
      });

      // this.items = [
      // { img: "assets/img/04.jpg", name: "Marcia Carneiro", city: "Florianopolis", datetime: "30/12/16 • 19:55", description: "Floripa terra do surf. Bora ficar bem tranquilo e relaxado :)"},
      // { img: "assets/img/05.jpg", name: "Junior Franca", city: "Cabo Verde", datetime: "18/12/14 • 09:32", description: "Cabo verde um pedaço do céu aqui na terra #ferias"},
      // { img: "assets/img/06.jpg", name: "Hilario Cardoso", city: "Rio de Janeiro", datetime: "20/11/16 • 12:20", description: "Um ótimo lugar para curtir as férias. #tranquilo #praia"},
      // { img: "assets/img/07.jpg", name: "Julia Costa", city: "Salvador", datetime: "04/01/17 • 17:27", description: "Primeira vez em salvador e já quero voltar antes mesmo de ir embora"}
      // ]
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ShowPage, {
      item: item
    });
  }

  doRefresh(refresher){
  setTimeout(() => {
    this.loadList();
    refresher.complete();
  }, 2000);
}

  loadList(){
    this.db.executeSql('SELECT * FROM pics', []).then((data) => {
      this.items = [];
      if(data.rows.length > 0){
        for (let i = 0; i < data.rows.length; i++) {
            this.items.push({ photo: data.rows.item(i).photo,
                              city: data.rows.item(i).city,
                              day: data.rows.item(i).day,
                              lat: data.rows.item(i).lat,
                              long: data.rows.item(i).long });
        }
      }

      // alert(JSON.stringify(this.items));
    }, (err) => {
      alert("Error: " + JSON.stringify(err));
    });
  }

  addPhoto(photo, day, lat, long){
    this.db.executeSql('INSERT INTO pics (photo, city, day, lat, long) VALUES (?,?,?,?,?)',
                       [photo, this.city, day, lat, long]).then((data) => {
      this.loadList();
    }, (err) => {
      alert("ERROR: " + JSON.stringify(err));
    });
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      let photo = "data:image/jpeg;base64," + imageData;
      this.addPhoto(photo, Date.now(), this.lat, this.long);
    });
  }

}
