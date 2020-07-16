import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class ApiService {
    

private SERVER_URL = "http://3.15.234.247:8080/AsistePlatform";

constructor(private httpClient: HttpClient) {
    
}

public reloadLocation(id: string): Observable<any>{
    return this.httpClient.get(`http://asisteservicewebapi-dev.us-west-2.elasticbeanstalk.com/api/Service/statusService?id=${id}`, {responseType: 'json'});
    }
 }