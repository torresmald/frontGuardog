import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_API = 'http://localhost:4000/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public registerUser (body: any){
    return this.http.post(`${URL_API}/register`, body)
  }
}
