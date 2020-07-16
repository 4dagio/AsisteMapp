import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { promise } from 'protractor';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  private uri_api = environment.api_uri;
  private headers: any;
  constructor(
    private http: HTTP,
    private storage: Storage,
  ) { }

  private async setHeader() {
    this.headers = {
      "content-type": "application/json",
      "Accept": 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
    }
    return this.headers;
  }

  private async usingHttpServices(endPoint: string, type: string, params?: any) {
    debugger;
    
    let uri = this.uri_api + endPoint;
    this.headers = await this.setHeader();

    this.http.setDataSerializer("json");
    this.http.setHeader("*","Accept", "application/json");
    this.http.setHeader("*","Content-Type", "application/json");
    let request;

    switch (type) {
      case 'get':
        request = await this.http.get(uri, params, this.headers);
        break;
      case 'post':
        request = await this.http.post(uri, params, this.headers);
        break;
      case 'put':
        request = await this.http.put(uri, params, this.headers);
        break;
      default:
        return 'Http method not supported.';
    }
    return request;
  }

  public async get(endPoint: string, params?: any) {
    return await this.usingHttpServices(endPoint, 'get', params);
  }

  public async post(endPoint: string, params?: any) {
    return await this.usingHttpServices(endPoint, 'post', params);
  }

  public async put(endPoint: string, params?: any, headers?: any) {
    return await this.usingHttpServices(endPoint, 'put', params);
  }


  public async generateAuthenticationApp(endPoint: string) {
    let header = { 'ClientId': environment.client_id_apk };
    let url = environment.api_uri + endPoint;
    let dataHeader = { headers: { 'ClientId': environment.client_id_apk } }
    return await this.http.post(url, {}, dataHeader);
  }

}