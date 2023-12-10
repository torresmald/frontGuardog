import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAppointments } from 'src/app/core/models/Appointments/api/apiAppointmentModel';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { ApiServices } from 'src/app/core/models/Services/api/apiServiceModel';

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

  public getApiAppointmentsDate(date: string): Observable<ApiServices[]>{
    return this.http.get<ApiServices[]>(`${URL_API}/date?date=${date}`)
}

    public registerApiAppointment(body: ApiAppointments) : Observable<ApiAppointments>{
        return this.http.post<ApiAppointments>(URL_API, body)
    }

}
