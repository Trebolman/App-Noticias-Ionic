import { RespuestaTopHeadLines } from './../../interfaces/interfaces';
import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { TemplateBindingParseResult } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  noticias: Article[] = [];
  // totalNoticias: number = 0;
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadLines().subscribe( resp => {
      this.noticias.push(...resp.articles);
      if(resp.articles.length == 0){
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
