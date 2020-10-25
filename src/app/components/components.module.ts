import { IonicModule } from '@ionic/angular';
import { NoticiasComponent } from './noticias/noticias.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';



@NgModule({
  declarations: [NoticiaComponent, NoticiasComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiasComponent
  ]
})
export class ComponentsModule { }
