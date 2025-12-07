import { Injectable } from '@angular/core';
import { 
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse, HttpResponse }
from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';




@Injectable()
export class Interceptor implements HttpInterceptor {

  urlIsLogin = '';

  constructor(private router: Router,
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService){

  }
 intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    
    this.spinnerService.show();
    this.urlIsLogin = 'api/v1/login'; 
    
    if (!request.url.match(this.urlIsLogin)){
      let token = localStorage.getItem('token');
      request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}` 
          }
      });
    }
  
    return next.handle(request).pipe(
      finalize(() => this.spinnerService.hide()),
      catchError((error: HttpErrorResponse) => {

        this.showError(error);
        // this.spinnerService.hide();
        return throwError(error);
      })
    );
  }

  

  showError(error: HttpErrorResponse): void{
    switch(error?.status){
      case 400: //BadRequest
        this.toastr.error(error.error.message);
        break;
      case 401: //Unauthorized
      // case 405:
        this.router.navigate(['/login']).then();
        this.toastr.error('Faça o login novamente');
        break;
      case 500: //InternalServerError
      case 504: //Gateway Timeout
        this.toastr.error('Houve erro de comunicação com o servidor! Contate o administrador!');
        console.log(error);
        break;

    }
  }
}