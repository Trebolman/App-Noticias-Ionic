import { environment } from "./../../environments/environment";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Noticia } from '../interfaces/noticiasWebSearch';
import { env } from 'process';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;
const apiHost = environment.apiHost;
// const headers = {
//   "X-Api-Key": apiKey,
// };

// const URL = "https://rapidapi.p.rapidapi.com/api/Search/WebSearchAPI";
const headers = {
  "x-rapidapi-host": apiHost,
  "x-rapidapi-key": apiKey
};


@Injectable({
  providedIn: "root",
})
export class NoticiasService {
  q = "Peru";
  page_number = 0;
  page_size = 10;
  auto_correct = true;
  // safe_search = false;
  // with_thumbnails = true;
  // to_published_date = "";
  // from_published_date = "";

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  constructor(private http: HttpClient) {}

  // getNews() {
  //   return this.http.get(this.q, {headers: headers2});
  // }

  getTopHeadLines() {
    this.page_number++;
    // return this.ejecutarQuery<RespuestaTopHeadLines>(
    //   `/top-headlines?country=us&page=${this.categoriaPage}`
    // );
    return this.ejecutarQuery<Noticia>(`/NewsSearchAPI?q=${this.q}&pageNumber=${this.page_number}&pageSize=${this.page_size}&autoCorrect=${this.auto_correct}`);
  }

  getTopHeadLinesCategories(categoria: string) {
    if (this.q == categoria) {
      this.page_number++;
    } else {
      this.page_number = 1;
      this.q = categoria;
    }
    return this.ejecutarQuery<Noticia>(
      `/NewsSearchAPI?q=${categoria}&pageNumber=${this.page_number}`
    );
  }
}
