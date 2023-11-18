import { ApiAppointments } from "src/app/core/models/Appointments/api/apiAppointmentModel";
import { Appointments } from "src/app/core/models/Appointments/transformed/AppointmentModel";


export function transformDataAppointment(appointment: ApiAppointments): Appointments {
    delete appointment.__v
    delete appointment.createdAt;
    delete appointment.updatedAt;
    return appointment;
}