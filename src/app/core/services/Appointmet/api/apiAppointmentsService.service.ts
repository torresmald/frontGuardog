import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAppointments } from 'src/app/core/models/Appointments/api/apiAppointmentModel';
import { ApiServices } from 'src/app/core/models/Services/api/apiServiceModel';
import { environment } from 'src/environments/environment';


const URL_API = {
  DOMAIN: environment,
  APPOINTMENTS: '/appointments',
  USER: '/user',
  DATE: '/date?date='
}

@Injectable({
  providedIn: 'root',
})
export class ApiAppointmentsService {
  constructor(private http: HttpClient) {}

  public getApiAppointments(): Observable<ApiAppointments[]> {
    return this.http.get<ApiAppointments[]>(`${URL_API.DOMAIN}${URL_API.APPOINTMENTS}`);
  }
  public getApiAppointment(id: string): Observable<ApiAppointments> {
    return this.http.get<ApiAppointments>(`${URL_API.DOMAIN}${URL_API.APPOINTMENTS}/${id}`);
  }

  public getApiAppointmentsUser(user: string): Observable<ApiAppointments[]> {
    return this.http.get<ApiAppointments[]>(`${URL_API.DOMAIN}${URL_API.APPOINTMENTS}${URL_API.USER}/${user}`);
  }

  public getApiAppointmentsDate(date: string): Observable<ApiServices[]> {
    return this.http.get<ApiServices[]>(`${URL_API.DOMAIN}${URL_API.APPOINTMENTS}${URL_API.DATE}${date}`);
  }

  public registerApiAppointment(
    body: ApiAppointments
  ): Observable<ApiAppointments> {
    return this.http.post<ApiAppointments>(`${URL_API.DOMAIN}${URL_API.APPOINTMENTS}`, body);
  }

  public deleteApiAppointment(id: string): Observable<string> {
    return this.http.delete<string>(`${URL_API.DOMAIN}${URL_API.APPOINTMENTS}/${id}`);
  }
}
