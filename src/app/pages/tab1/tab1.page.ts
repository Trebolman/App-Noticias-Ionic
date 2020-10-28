import { RespuestaTopHeadLines } from './../../interfaces/interfaces';
import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/interfaces/noticiasWebSearch';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  noticias: Articulo[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.cargarNoticias();
    // this.noticiasService.getNews().subscribe(noticia => console.log('noticia', noticia));
  }

  loadData(event){
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadLines().subscribe( resp => {
      // console.log(resp);
      
      this.noticias.push(...resp.value);
      if(resp.value.length == 0){
        event.target.disabled = true;
        event.target.complete();
        return
      }
      // this.totalNoticias = resp.totalResults;
    });
    if(event){
      event.target.complete();
    }
    // if(this.noticias.length < this.totalNoticias){
    //   event.target.disabled = true;
    // }
  }
}
