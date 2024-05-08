
import { Injectable } from '@angular/core';
import { IPatient } from './../Models/i-patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISingleDocAppointment } from '../Models/SingleDoctorAppointment';
import { IPatientAdd } from '../Models/patientAddDTO';
import { IAppointment } from '../Models/appointment';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(private httpClient: HttpClient) { }

    addAppointment(app : IAppointment): Observable<IAppointment> {
        return this.httpClient.post<IAppointment>(`https://localhost:7013/api/Patient/Appointment/Add` , app);
    }

    getOrder(date : string): Observable<string> {
        return this.httpClient.post<string>(`https://localhost:7013/api/Doctor/Appointment/Order` , date);
    }

    getAllPatients(): Observable<IPatient[]> {
        return this.httpClient.get<IPatient[]>(`https://localhost:7013/api/Patient/Details`)
    };

    getAllAppointments(patientID: number): Observable<ISingleDocAppointment[]> {
        return this.httpClient.get<ISingleDocAppointment[]>(`https://localhost:7013/api/Patient/AppointmentDocs/${patientID}`)
    }

    addPatient(patient: IPatientAdd): Observable<IPatientAdd> {
        return this.httpClient.post<IPatientAdd>(`https://localhost:7013/api/Patient/Create/`, patient);
    }

    editPatient(updatedPatient: IPatient): Observable<any> {
        return this.httpClient.put<IPatient>(`https://localhost:7013/api/Patient/Update`, updatedPatient);
    }

    getPatientById(patientId: number): Observable<any> {
        return this.httpClient.get<IPatient>(`https://localhost:7013/api/Patient/${patientId}`);
    }

    deletePatient(patientId: number): Observable<void> {
        return this.httpClient.delete<void>(`https://localhost:7013/api/Patient/Delete/${patientId}`);
    }


    getpatientProfileById(patientId: number): Observable<any> {
        return this.httpClient.get<IPatient>(`https://localhost:7013/api/Patient/${patientId}`);
    }
    
    postpatientRate(bodyOfreview: any): Observable<IPatient> {
        return this.httpClient.post<IPatient>(`https://localhost:7013/api/Patient/Review/Add`, bodyOfreview);
    }
}
