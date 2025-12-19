import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']

})
export class BlankPageComponent {

  @ViewChild('grupoId') grupoId!: ElementRef;

  private apiUrl = environment.URL_API // ajuste se necessário

  constructor(private http: HttpClient) {}

  import() {
    
    if (this.grupoId.nativeElement.value == '' || this.grupoId.nativeElement.value == undefined){
        alert('Informe o Id do Grupo de Oração');
        return
    }

    const url = `${this.apiUrl}/api/v1/grupo-oracao/import-csv/${this.grupoId.nativeElement.value}`;

    this.http.put(url, {}).subscribe({
      next: () => alert('Importação realizada com sucesso'),
      error: err => {
        console.error(err);
        alert('Erro ao executar Importação');
      }
    });
  }

  importAll() {
    const url = `${this.apiUrl}/api/v1/grupo-oracao/import-csv/all`;

    this.http.put(url, {}).subscribe({
      next: () => alert('Importação de Todos executada com sucesso'),
      error: err => {
        console.error(err);
        alert('Erro ao executar Importação Todos');
      }
    });
  }
}
