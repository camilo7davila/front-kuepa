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
    return this.http.post<any>(finalUrl, data)
  }

  parseJwt(token: any) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
  }

  validateRole(rol: string) {
    switch (rol) {
      case 'ROL_STUDENT':
        return false
      case 'ROL_MODERATOR':
        return true
      default:
        break;
    }
  }
}
