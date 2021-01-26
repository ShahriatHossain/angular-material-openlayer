import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private isLocalHost: boolean;

  constructor(private httpClient: HttpClient) { 
    this.isLocalHost = (window.location.hostname.toLocaleLowerCase() == 'localhost');
  }

  get<T>(url: string, fileName: string) {
    if(this.isLocalHost) url = `../../../assets/data/${fileName}`;

    return this.httpClient.get(url);
  }

  jsonp<T>(url) {
    return this.httpClient.jsonp(url, 'jsonp');
  }

  create(url: string, entityName: string, data) {
    return this.httpClient.post(url, data);
  }

  update(url: string, entityName: string, id, data) {
    return this.httpClient.patch(url, data);
  }

  delete(url: string, entityName: string, data) {
    return this.httpClient.delete(url);
  }
}
