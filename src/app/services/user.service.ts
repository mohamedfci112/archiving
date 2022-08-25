import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080/archiving_php/';
  // baseUrl = 'https://unicoarchiving.000webhostapp.com//archiving_php/';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  userlogin(username, password) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post(this.baseUrl + 'login.php', { username, password }).pipe(map(Users => {
    this.setToken(Users[0].id);
    this.getLoggedInName.emit(true);
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  changepassword(userid, cpassword, npassword) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post(this.baseUrl + 'changepassword.php', { userid, cpassword, npassword }).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  userregistration(name, email, pwd, type, depart) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'register.php', { name, email, pwd, type, depart }).pipe(map(Users => {
    return Users;
    }));
  }

  // token
// tslint:disable-next-line:typedef
setToken(token: string) {
  localStorage.setItem('token', token);
  }
  // tslint:disable-next-line:typedef
  getToken() {
  return localStorage.getItem('token');
  }
  // tslint:disable-next-line:typedef
  deleteToken() {
  localStorage.removeItem('token');
  }
  // tslint:disable-next-line:typedef
  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true;
  }
  return false;
  }

}
