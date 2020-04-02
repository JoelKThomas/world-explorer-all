import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  uri = 'http://localhost:8080/worldexplorer/api/v1';

  selectedUser: User = {
    username: '',
    email: '',
    password: '',
    mobile: ''
  };


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(`${this.uri}/auth/register`, user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(`${this.uri}/auth/login`, authCredentials, { responseType: 'text' });
  }

  getUserProfile() {
    return this.http.get(`${this.uri}/user/userProfile`);
  }

  setToken(token: string) {
    console.log('token saved')
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else { return null; }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
