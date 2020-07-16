import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http'; 
import { Storage } from '@ionic/storage'; 
import { Observable, from } from 'rxjs';
import { AlertController } from '@ionic/angular';

import {
  catchError,
  tap,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(
    private storage : Storage,
    public alertController: AlertController,
  ) { }

  intercept(request: HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{

    //Create Observable methodo and get token to storage sql element.
    return from( this.storage.get('token')).pipe(
      switchMap(
        (token : any)=>{
          if(token){
            let headers =  new HttpHeaders(); 
            headers = headers.set('Access-Control-Allow-Origin' , '*');
            headers = headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            headers = headers.set('Accept','application/json');
            headers = headers.set('content-type','application/json');
            headers = headers.set('Authorization','Bearer ' + token); 
            let requestClone =  request.clone({
              headers: headers
            });
            return next.handle(requestClone);
          }else{
            let headers =  new HttpHeaders(); 
            headers = headers.set('Access-Control-Allow-Origin' , '*');
            headers = headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            headers = headers.set('Accept','application/json');
            headers = headers.set('content-type','application/json');
            headers = headers.set('ClientId', environment.client_id_apk);
            let requestClone =  request.clone({
              headers: headers
            });
            return next.handle(requestClone);  
          }   
        }),
      catchError((error:any) =>{
        this.alertErrorIdentification(error);
        return next.handle(error);
      })
    );
  }


  async alertErrorIdentification(messagge : string) {
    const alert = await this.alertController.create({
      header: 'Error interceptor',
      message: JSON.stringify(messagge),
      buttons: ["Continuar"]
    });

    await alert.present();
  }
}