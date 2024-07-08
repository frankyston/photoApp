import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ShowPage } from '../pages/show/show';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      let db = new SQLite();
      db.openDatabase({
        name: 'data.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql('CREATE TABLE IF NOT EXISTS pics (id INTEGER PRIMARY KEY AUTOINCREMENT, photo TEXT, city VARCHAR(255), day DATETIME, lat VARCHAR(255), long VARCHAR(255))', {}).then(() => {

        }, (err) => {
          alert('Error to execute sql: ' + JSON.stringify(err));
        });
      }, (err) => {
        alert('Error to open database: ' + JSON.stringify(err));
      });
      setTimeout(() => { // <===
        this.nav.setRoot(ListPage)
      }, 3000);
    });
  }
}
