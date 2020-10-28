import { DataLocalService } from "./../../services/data-local.service";
import { Component, Input, OnInit } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ActionSheetController } from "@ionic/angular";
import { Articulo } from "src/app/interfaces/noticiasWebSearch";

@Component({
  selector: "app-noticia",
  templateUrl: "./noticia.component.html",
  styleUrls: ["./noticia.component.scss"],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Articulo;
  @Input() index: number;
  // noticiasGuardadas: Articulo[] = [];

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
  ) {}

  ngOnInit() {
  }

  onClick() {
    this.iab.create(this.noticia.url, "_system");
  }

  async lanzarMenu() {
    let btnGuardarBorrarFavorito;

    if (this.noticia.saved) {
      btnGuardarBorrarFavorito = {
        text: "Eliminar de favoritos",
        icon: "heart",
        handler: () => {
          this.noticia.saved = false;
          this.dataLocalService.eliminarNoticia(this.noticia.id);
        }
      };
    } else {
      btnGuardarBorrarFavorito = {
        text: "Favoritos",
        icon: "heart-outline",
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Compartir",
          icon: "share",
          handler: () => {
            // elegimos share porque permite al usuario elegir lo que quiera.
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.provider.name,
              "",
              this.noticia.url
            );
          },
        },
        btnGuardarBorrarFavorito,
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
