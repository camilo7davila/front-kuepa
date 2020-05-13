import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  url = `${environment.urlApi}/message`

  private headers = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}

  constructor(private http: HttpClient) { }

  listMessage(id: string) {
    const finalUrl = `${this.url}/listbyroom/${id}`
    return this.http.get<any>(finalUrl)
  }

  createMessage(data) {
    return this.http.post<any>(this.url, data, this.headers)
  }
}
