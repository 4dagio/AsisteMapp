import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class ApiService {
    

private SERVER_URL = "https://plataforma.asisteapp.co";

constructor(private httpClient: HttpClient) {
    
}

public reloadLocation(id: string): Observable<any>{
    // return this.httpClient.get(`http://localhost:8080/AsistePlatform/UbicationLinkAPI.jsn?id=${id}`, {responseType: 'json'});
    return this.httpClient.get(`https://plataforma.asisteapp.co/AsistePlatform/UbicationLinkAPI.jsn?id=${id}`, {responseType: 'json'});
    }
 }