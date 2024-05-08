import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements AfterViewInit  {
  openSnackBar() {
    throw new Error('Method not implemented.');
  }
  id:number = parseInt(localStorage.getItem("id") ?? "");
  role:string = localStorage.getItem("role") ?? "";
  docProfileData:any;
  errRespon:any;
  comingAppoint:any=[];
  IsWait: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private _DoctorService:DoctorService,private router:Router,private _snackBar: MatSnackBar){}


  ngAfterViewInit(): void {
    if(Number.isNaN(this.id))
    {
      alert("you are not logged in");
      this.router.navigate(['patient/signin']);
      return;
    }
    else if (this.role != "doctor")
    {
      alert("you are not authorized to enter this page");
      this.router.navigate(['unauthorized']);
      return;
    }
    this._DoctorService.getProfileDoc(this.id).subscribe((res)=>{
      this.docProfileData=res;
      this.IsWait = false;
      console.log(this.docProfileData);
    })
  }

  navDoc(docId :any)
  {
    console.log(docId);
    this.router.navigate([`/doctor/profile/edit/${docId}`]);

  }

}
