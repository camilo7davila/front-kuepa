import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.urlApi}/user`

  constructor(private http: HttpClient) { }

  registerUser (user: User) {
    const finalUrl = `${this.url}/auth/register`
    return this.http.post(finalUrl, user)
  }

  loginUser (data) {
    const finalUrl = `${this.url}/auth/login`
    return this.http.post(finalUrl, data)
  }
}
