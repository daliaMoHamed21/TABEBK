import { loginDTO } from './../Models/logindto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userInfo } from '../Models/userInfo';
import { ChangePass } from '../Models/changePass';
import { changePic } from '../Models/changePic';
import { userBasicInfo } from '../Models/userBasicInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  Login(loginInfo: loginDTO) : Observable<userInfo>{
    return this.httpClient.post<userInfo>('https://localhost:7013/api/User/Login',loginInfo);
  }

  ChangePassword(change : ChangePass) : Observable<ChangePass>{
    return this.httpClient.patch<ChangePass>('https://localhost:7013/api/User/changepassword',change)
  }

  ChangeProfilePicture(change : FormData) : Observable<FormData>{
    return this.httpClient.patch<FormData>(`https://localhost:7013/api/User/changepfp`,change);
  }

  DeleteProfilePicture(deleteus : userBasicInfo) : Observable<userBasicInfo>{
    return this.httpClient.patch<userBasicInfo>(`https://localhost:7013/api/User/deletepfp`,deleteus);
  }

  ActivateAccount(account : any) : Observable<any>{
    return this.httpClient.patch<any>(`https://localhost:7013/api/Admin/Account/Activate`,account);
  }

  RejectAccount(account : any) : Observable<any>{
    return this.httpClient.patch<any>(`https://localhost:7013/api/Admin/Account/Reject`,account);
  }

  BanAccount(account : any) : Observable<any>{
    return this.httpClient.patch<any>(`https://localhost:7013/api/Admin/Account/Banned`,account);
  }
}
