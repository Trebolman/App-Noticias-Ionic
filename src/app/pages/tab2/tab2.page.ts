import { NoticiasService } from "./../../services/noticias.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { IonSegment } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit, AfterViewInit {
  @ViewChild(IonSegment) segment: IonSegment;

  categorias = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  noticias = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias(this.categorias[0]);
  }

  ngAfterViewInit() {
    this.segment.value = this.categorias[0];
  }

  cambioCategoria(event) {
    // console.log(this.segment.value);
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService
      .getTopHeadLinesCategories(categoria)
      .subscribe((resp) => {
        this.noticias.push(...resp.articles);

        if (event) {
          if (resp.articles.length == 0) {
            event.target.disabled = true;
          }
          event.target.complete();
        }
      });
  }
}
