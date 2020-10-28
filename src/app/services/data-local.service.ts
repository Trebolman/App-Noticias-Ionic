import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Articulo } from "../interfaces/noticiasWebSearch";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  noticiasFavoritas: Articulo[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {}

  guardarNoticia(noticia: Articulo) {
    if (this.siNoticiaGuardada(noticia)) {
      return false;
    } else {
      noticia.saved = true;
      this.noticiasFavoritas.unshift(noticia);
      this.storage.set("favoritos", this.noticiasFavoritas);
      this.presentToast('Favorito guardado');
      return true;
    }
  }

  async cargarNoticias() {
    const favoritos: Articulo[] = await this.storage.get("favoritos");
    if (favoritos) {
      this.noticiasFavoritas = favoritos;
    }
    // return favoritos;
  }

  eliminarNoticia(id: string) {
    this.noticiasFavoritas = this.noticiasFavoritas.filter(
      (noti) => noti.id !== id
    );

    this.storage.set("favoritos", this.noticiasFavoritas);
    this.presentToast('Favorito eliminado');
    // console.log(this.noticiasFavoritas);
  }

  siNoticiaGuardada(noticia: Articulo) {
    const noticiaEncontrada = this.noticiasFavoritas.find(
      (noti) => noti.id === noticia.id
    );
    return noticiaEncontrada;
  }

  async presentToast( mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: 'medium',
      cssClass: 'animated fadeIn'
    });
    toast.present();
  }
}
