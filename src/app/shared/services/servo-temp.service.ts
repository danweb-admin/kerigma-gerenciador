import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Servo } from '../models/servo';

const URL_SERVO = '/api/v1/servos-temporarios';

@Injectable({
  providedIn: 'root'
})
export class ServoTempService {
  
  constructor(private http: HttpClient){

  }

  loadServos(): Observable<Servo[]> {
    return this.http.get(`${environment.URL_API}${URL_SERVO}/load-servos`)
    .pipe(map((resp: Servo[]) => {
      return resp;
    }));
  }

  loadServosByGrupoOracao(grupoOracaoId: string): Observable<Servo[]> {
    return this.http.get(`${environment.URL_API}${URL_SERVO}?grupoOracaoId=${grupoOracaoId}`)
    .pipe(map((resp: Servo[]) => {
      return resp;
    }));
  }


  checked(servo: Servo): Observable<Servo>{
    return this.http.post(`${environment.URL_API}${URL_SERVO}/validado`,servo)
    .pipe(map((resp: Servo) => {
      return resp;
    }));
  }

  delete(servo: string): Observable<Servo>{
    return this.http.delete(`${environment.URL_API}${URL_SERVO}/${servo}`)
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
}
