import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  url = `${environment.urlApi}/message`

  constructor(private http: HttpClient) { }

  listMessage(id: string) {
    const finalUrl = `${this.url}/listbyroom/${id}`
    return this.http.get<any>(finalUrl)
  }
}
