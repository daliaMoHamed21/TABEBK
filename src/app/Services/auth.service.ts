import { Status } from './../Enums/Status';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable , BehaviorSubject} from 'rxjs';
import { userInfo } from '../Models/userInfo';
import { ChangePass } from '../Models/changePass';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   userData!: userInfo;
   role : string = localStorage.getItem("role") ?? "";
   status : Status = parseInt(localStorage.getItem("status") ?? "") as Status;

  constructor(private httpClient:HttpClient) { }


 public returnRole(){
    return this.role;
  }

  public setRole(role:string){
    this.role = role;
  }

  public setStatus(status:Status){
    this.status = status
  }

  public returnStatus(){
    return this.status;
  }

  PatientAndDoctorSignIn(userData:userInfo):Observable<any>
  {
    return this.httpClient.post(`https://localhost:7013/api/User/Login`, userData)
  }

  ChangePassword(change : ChangePass) : Observable<ChangePass>{
    return this.httpClient.patch<ChangePass>('https://localhost:7013/api/User/changepassword',change)
  }

}
