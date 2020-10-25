import { Component, Input, OnInit } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController } from "@ionic/angular";
import { Article } from "src/app/interfaces/interfaces";

@Component({
  selector: "app-noticia",
  templateUrl: "./noticia.component.html",
  styleUrls: ["./noticia.component.scss"],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() index: number;
  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    // console.log("prueba");
  }

  onClick() {
    this.iab.create(this.noticia.url, "_system");
    // this.iab.create(this.noticia.url);
  }

  async lanzarMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Compartir",
          icon: "share",
          handler: () => {
            console.log("Share clicked");
          },
        },
        {
          text: "Favorito",
          icon: "heart-outline",
          handler: () => {
            console.log("Favorite clicked");
          },
        },
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
