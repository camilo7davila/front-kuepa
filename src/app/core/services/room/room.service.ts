import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url = `${environment.urlApi}/room`

  constructor(private http: HttpClient) { }

  getRoom(id: string) {
    const finalUrl = `${this.url}/${id}`
    return this.http.get<any>(finalUrl)
  }

}
