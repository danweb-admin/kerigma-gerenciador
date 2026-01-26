import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Paroquia } from '../models/paroquia';
import { Servo } from '../models/servo';

const URL_SERVO = '/api/v1/servos';

@Injectable({
  providedIn: 'root'
})
export class ServoService {
  
  constructor(private http: HttpClient){

  }

  loadServosByGrupoOracao(grupoOracaoId: string): Observable<Servo[]> {
    
    return this.http.get(`${environment.URL_API}${URL_SERVO}?grupoOracaoId=${grupoOracaoId}`)
    .pipe(map((resp: Servo[]) => {
      return resp;
    }));
  }

  loadServos(search: string): Observable<Servo[]> {
    
    return this.http.get(`${environment.URL_API}${URL_SERVO}/get-all?search=${search}`)
    .pipe(map((resp: Servo[]) => {
      return resp;
    }));
  }

  save(servo: Servo): Observable<Servo>{
    return this.http.post(`${environment.URL_API}${URL_SERVO}`,servo)
    .pipe(map((resp: Servo) => {
      return resp;
    }));
  }

  update(servo: Servo): Observable<Servo>{
    return this.http.put(`${environment.URL_API}${URL_SERVO}/${servo.id}`,servo)
    .pipe(map((resp: Servo) => {
      return resp;
    }));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${environment.URL_API}${URL_SERVO}/${id}`)
    .pipe(map(() => undefined));
  }

}
