import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAppointments } from 'src/app/core/models/Appointments/api/apiAppointmentModel';

const URL_API = 'http://localhost:4000/appointments';


@Injectable({
  providedIn: 'root'
})
export class ApiAppointmentsService {

  constructor(private http: HttpClient) { }

    public getApiAppointments(): Observable<ApiAppointments[]>{
        return this.http.get<ApiAppointments[]>(URL_API)
    }
    public getApiAppointmentsUser(user: string): Observable<ApiAppointments[]>{
      return this.http.get<ApiAppointments[]>(`${URL_API}/user/${user}`)
  }
    public getApiAppointment(id: string): Observable<ApiAppointments>{
        return this.http.get<ApiAppointments>(`${URL_API}/${id}`)
    }

    public registerApiAppointment(body: string) : Observable<ApiAppointments>{
        return this.http.post<ApiAppointments>(URL_API, body)
    }

}
