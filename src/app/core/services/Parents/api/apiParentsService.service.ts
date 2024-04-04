import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiParents } from 'src/app/core/models/Parents/api/apiParentModel';
import { ApiUsers } from 'src/app/core/models/Users/api/apiUserModel';
import { environment } from 'src/environments/environment';

const URL_API = {
  DOMAIN: environment.baseUrl,
  PARENTS: '/parents',
  REGISTER: '/register',
  LOGIN: '/login',
  VERIFY: '/verify',
  FORGOT: '/forgot-password'
}

@Injectable({
  providedIn: 'root'
})
export class ApiParentsService {

  constructor(private http: HttpClient) { }

  public getApiParents(): Observable<ApiParents[]>{
    return this.http.get<ApiParents[]>(`${URL_API.DOMAIN}${URL_API.PARENTS}`)
  }

  public getApiParent(id: string): Observable<ApiParents>{
    return this.http.get<ApiParents>(`${URL_API.DOMAIN}${URL_API.PARENTS}/${id}`)
  }

  public registerApiParent (body: FormData): Observable<ApiParents>{
    return this.http.post<ApiParents>(`${URL_API.DOMAIN}${URL_API.PARENTS}${URL_API.REGISTER}`, body)
  }

  public loginApiParent (body: ApiParents): Observable<ApiUsers>{
    return this.http.post<ApiUsers>(`${URL_API.DOMAIN}${URL_API.PARENTS}${URL_API.LOGIN}`, body)
  }
  
  public verifyApiParentAccount(token: string): Observable<string>{
    return this.http.get<string>(`${URL_API.DOMAIN}${URL_API.PARENTS}${URL_API.VERIFY}/${token}`)
  }

  public forgotApiPassword(body: string): Observable<string>{
    return this.http.post<string>(`${URL_API.DOMAIN}${URL_API.PARENTS}${URL_API.FORGOT}`, body)
  }
  public forgotApiPasswordToken(token:string): Observable<string>{
    return this.http.get<string>(`${URL_API.DOMAIN}${URL_API.PARENTS}${URL_API.FORGOT}/${token}`)
  }
  public updateApiPassword(token:string, password: string): Observable<string>{
    const body = { password }
    return this.http.post<string>(`${URL_API.DOMAIN}${URL_API.PARENTS}${URL_API.FORGOT}/${token}`, body)
  }

  public updateApiDataParent(id: string, body: string): Observable<string>{
    return this.http.put<string>(`${URL_API.DOMAIN}${URL_API.PARENTS}/${id}`, body)
  }
  
}
