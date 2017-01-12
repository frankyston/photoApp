import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowPage } from '../show/show';
/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  selectedItem: any;
  items: Array<{img: string, name: string, city: string, datetime: string, description: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.items = [
      { img: "assets/img/04.jpg", name: "Marcia Carneiro", city: "Florianopolis", datetime: "30/12/16 • 19:55", description: "Floripa terra do surf. Bora ficar bem tranquilo e relaxado :)"},
      { img: "assets/img/05.jpg", name: "Junior Franca", city: "Cabo Verde", datetime: "18/12/14 • 09:32", description: "Cabo verde um pedaço do céu aqui na terra #ferias"},
      { img: "assets/img/06.jpg", name: "Hilario Cardoso", city: "Rio de Janeiro", datetime: "20/11/16 • 12:20", description: "Um ótimo lugar para curtir as férias. #tranquilo #praia"},
      { img: "assets/img/07.jpg", name: "Julia Costa", city: "Salvador", datetime: "04/01/17 • 17:27", description: "Primeira vez em salvador e já quero voltar antes mesmo de ir embora"}
      ]
  }
  itemTapped(event, item) {
      // That's right, we're pushing to ourselves!
      this.navCtrl.push(ShowPage, {
        item: item
      });
    }

}
