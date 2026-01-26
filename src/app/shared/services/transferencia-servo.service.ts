import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Paroquia } from '../models/paroquia';
import { TransferenciaServo } from '../models/transferencia-servo';

const URL_TRANSFERENCIA = '/api/v1/transferencia-servo';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaServosService {
  
  constructor(private http: HttpClient){

  }

  loadTransferencias(search: string): Observable<TransferenciaServo[]> {
    
    return this.http.get(`${environment.URL_API}${URL_TRANSFERENCIA}?search=${search}`)
    .pipe(map((resp: TransferenciaServo[]) => {
      return resp;
    }));
  }

  getById(id: string): Observable<Paroquia> {
    return this.http.get(`${environment.URL_API}${URL_TRANSFERENCIA}?id=${id}`)
    .pipe(map((resp: Paroquia) => {
      return resp;
    }));
  }


  save(transferencia: any): Observable<any>{
    return this.http.post(`${environment.URL_API}${URL_TRANSFERENCIA}`,transferencia)
    .pipe(map((resp: any) => {
      return resp;
    }));
  }

  update(paroquia: Paroquia): Observable<Paroquia>{
    return this.http.put(`${environment.URL_API}${URL_TRANSFERENCIA}/${paroquia.id}`,paroquia)
    .pipe(map((resp: Paroquia) => {
      return resp;
    }));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${environment.URL_API}${URL_TRANSFERENCIA}/${id}`)
    .pipe(map(() => undefined));
  }

}
