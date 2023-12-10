import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Appointments } from '../../models/Appointments/transformed/AppointmentModel';
import { ApiAppointmentsService } from './api/apiAppointmentsService.service';
import { transformDataAppointment } from './helpers/transformApi';
import { ApiAppointments } from '../../models/Appointments/api/apiAppointmentModel';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(
    private http: HttpClient,
    private apiAppointments: ApiAppointmentsService
  ) {}

  public getAppointments(): Observable<Appointments[]> {
    return this.apiAppointments.getApiAppointments().pipe(
      map((apiAppointment: ApiAppointments[]) => {
        return apiAppointment.map((apiAppointment: ApiAppointments) =>
          transformDataAppointment(apiAppointment)
        );
      })
    );
  }

  public getAppointmentsUser(user: string): Observable<Appointments[]> {
    return this.apiAppointments.getApiAppointmentsUser(user).pipe(
      map((appiAppointment: ApiAppointments[]) => {
        return appiAppointment.map((appiAppointment: ApiAppointments) => transformDataAppointment(appiAppointment))
      })
    )
  }

  public getAppointmentsDate(date: Date): Observable<Appointments[]> {
    return this.apiAppointments.getApiAppointmentsDate(date).pipe(
      map((appiAppointment: ApiAppointments[]) => {
        return appiAppointment.map((appiAppointment: ApiAppointments) => transformDataAppointment(appiAppointment))
      })
    )
  }


  public registerAppointment(body: any[]): Observable<Appointments> {
    return this.apiAppointments
      .registerApiAppointment(body)
      .pipe(
        map((apiAppointment: ApiAppointments) =>
          apiAppointment
        )
      );
  }
}
