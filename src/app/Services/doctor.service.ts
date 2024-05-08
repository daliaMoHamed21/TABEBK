import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctor } from '../Models/i-doctor';
import { Observable } from 'rxjs';
import { Speciality } from './../Models/speciality';
import { IDoctorAdd } from '../Models/doctorAddDTO';


@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    constructor(private httpClient: HttpClient) { }

    getAllDoctors(): Observable<IDoctor[]> {
        return this.httpClient.get<IDoctor[]>(`https://localhost:7013/api/Doctor/Details`)
    };

    addDoctor(doctor: IDoctorAdd): Observable<IDoctorAdd> {
        return this.httpClient.post<IDoctorAdd>(`https://localhost:7013/api/Doctor/Create`, doctor);
    }

    editDoctor(updatedDoctor: IDoctor): Observable<any> {
        console.log(updatedDoctor)
        return this.httpClient.put<IDoctor>(`https://localhost:7013/api/Doctor/Update`, updatedDoctor);
    }

    getDoctorById(doctortId: number): Observable<IDoctor> {
        return this.httpClient.get<IDoctor>(`https://localhost:7013/api/Doctor/${doctortId}`);
    }

    deleteDoctor(doctorId: number): Observable<void> {
        return this.httpClient.delete<void>(`https://localhost:7013/api/Doctor/Delete/${doctorId}`);
    }


    /* Start edit appoint component */
    getAllAppoint(id: any): Observable<any> {
        return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Requested/doctor=${id}`)
    }

    getAllAppointNoReq(id: any): Observable<any> {
        return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Others/doctor=${id}`)
    }
    acceptAppoint(id: any): Observable<any> {
        return this.httpClient.patch(`https://localhost:7013/api/Doctor/Appointment/Confirm/${id}`, "")
    }
    cancelAppoint(id: any): Observable<any> {
        return this.httpClient.patch(`https://localhost:7013/api/Doctor/Appointment/Reject/${id}`, "")
    }
    getComingAppoint(id: any): Observable<any> {
        return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Accepted/doctor/${id}`);
    }
    /* End edit appoint component */

    getProfileDoc(id: any): Observable<any> {
        return this.httpClient.get<IDoctor>(`https://localhost:7013/api/Doctor/Details/${id}`)
    }


    docotrSchedualDetails(id: any) : Observable<any>
    {
      return this.httpClient.get(`https://localhost:7013/api/Doctor/Schedule/${id}`)
    }
  
  
    getSchedule(doctorId: number): Observable<any> {
      return this.httpClient.get<any>(`https://localhost:7013/api/Doctor/Schedule/${doctorId}`);
    }
  
    editSchedule(scheduleData: any): Observable<any> {
      return this.httpClient.put<any>('https://localhost:7013/api/Doctor/Schedule/Edit', scheduleData);
    }
  
    addCertificate(cert:FormData): Observable<FormData>{
        return this.httpClient.post<FormData>('https://localhost:7013/api/Doctor/Document/Add',cert)
    }

    deleteCertificate(certID:number): Observable<number>{
        return this.httpClient.delete<number>(`https://localhost:7013/api/Doctor/Document/Delete/${certID}`)
    }

    GetNidCert(docID:number) : Observable<any>{
        return this.httpClient.get<any>(`https://localhost:7013/Document/nid&cert/${docID}`);
    }


    // ************** Speciality *********************

    getAllSpecialities(): Observable<any> {
        return this.httpClient.get<any>(`https://localhost:7013/api/Doctor/Speciality`);
    }

    addSpeciality(speciality: Speciality): Observable<Speciality> {
        return this.httpClient.post<Speciality>(`https://localhost:7013/api/Doctor/Speciality/Add`, speciality);
    }

    editSpeciality(updatedSpeciality: Speciality): Observable<any> {
        console.log(updatedSpeciality)
        return this.httpClient.put<Speciality>(`https://localhost:7013/api/Doctor/Speciality/Edit`, updatedSpeciality);
    }

    getSpecialityById(SpecialityId: number): Observable<Speciality> {
        return this.httpClient.get<Speciality>(`https://localhost:7013/api/Doctor/Speciality/${SpecialityId}`);
    }

    deleteSpeciality(SpecialityId: number): Observable<void> {
        return this.httpClient.delete<void>(`https://localhost:7013/api/Doctor/Speciality/Delete/${SpecialityId}`);
    }


    // ************** End Speciality *********************


}
