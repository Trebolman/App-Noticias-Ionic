import { environment } from './../../environments/environment';
import { Article, RespuestaTopHeadLines } from "./../interfaces/interfaces";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;
const headers = {
  'X-Api-Key': apiKey
}
@Injectable({
  providedIn: "root",
})
export class NoticiasService {
  categoriaPage: number = 0;
  categoriaName: string = '';

  private ejecutarQuery<T>( query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  constructor(private http: HttpClient) {}

  getTopHeadLines(){
    this.categoriaPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.categoriaPage}`);
  }

  getTopHeadLinesCategories(categoria: string){
    if(this.categoriaName == categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaName = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
