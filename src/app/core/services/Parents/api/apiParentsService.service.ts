import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiParents } from 'src/app/core/models/Parents/api/apiParentModel';
import { ApiUsers } from 'src/app/core/models/Users/api/apiUserModel';

const URL_API = 'http://localhost:4000/parents';


@Injectable({
  providedIn: 'root'
})
export class ApiParentsService {

  constructor(private http: HttpClient) { }

  public getApiParents(): Observable<ApiParents[]>{
    return this.http.get<ApiParents[]>(URL_API)
  }

  public getApiParent(id: string): Observable<ApiParents>{
    return this.http.get<ApiParents>(`${URL_API}/${id}`)
  }

  public registerApiParent (body: FormData): Observable<ApiParents>{
    return this.http.post<ApiParents>(`${URL_API}/register`, body)
  }

  public loginApiParent (body: ApiParents): Observable<ApiUsers>{
    return this.http.post<ApiUsers>(`${URL_API}/login`, body)
  }
  
  public verifyApiParentAccount(token: string): Observable<string>{
    return this.http.get<string>(`${URL_API}/verify/${token}`)
  }

  public forgotApiPassword(body: string): Observable<string>{
    return this.http.post<string>(`${URL_API}/forgot-password`, body)
  }
  public forgotApiPasswordToken(token:string): Observable<string>{
    return this.http.get<string>(`${URL_API}/forgot-password/${token}`)
  }
  public updateApiPassword(token:string, password: string): Observable<string>{
    const body = { password }
    return this.http.post<string>(`${URL_API}/forgot-password/${token}`, body)
  }

  public updateApiDataParent(id: string, body: string): Observable<string>{
    return this.http.put<string>(`${URL_API}/${id}`, body)
  }
  
}
