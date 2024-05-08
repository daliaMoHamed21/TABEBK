import { ISingleDocAppointment } from './../../../../Models/SingleDoctorAppointment';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from 'src/app/Enums/Status';
import { IAppointment } from 'src/app/Models/appointment';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})

export class AllAppointmentsComponent implements AfterViewInit, OnInit {

    appointmentDocs! : ISingleDocAppointment[];


    constructor(private _PatientService:PatientService , private _DoctorService:DoctorService, private router:Router){}
    id:number = parseInt(localStorage.getItem("id") ?? "");
    role:string = localStorage.getItem("role") ?? "";
    docID:number | undefined;
    date: string | undefined;
    dateNow: Date = new Date();
    dateNowplus1: Date = new Date(this.dateNow.getFullYear(),this.dateNow.getMonth(),this.dateNow.getDay()+1);
    
    status: Status = parseInt(localStorage.getItem("status")??"") as Status;
    ngOnInit(): void {
        if (isNaN(this.id)) this.router.navigate(['signin']);
        if (this.role != "patient") {
            this.router.navigate(['unauthorized']);
        }
    }

    ngAfterViewInit(): void {
  
      this._PatientService.getAllAppointments(this.id).subscribe((res)=>{
        this.appointmentDocs = res;
        console.log(res);
      });
    }

    GetDate(date:string){
        let newDate = new Date(date);
        return newDate > this.dateNow;
    }
   
    public rateForm:FormGroup = new FormGroup({
        score:new FormControl("" , Validators.required),
        notes:new FormControl("" , Validators.required),
        date: new FormControl("")
      });
    
    SetDocID(id:number,date:string){
        this.docID = id;
        this.date = new Date(date).toLocaleDateString("en-CA");
    }
    
      submitRating(formData:FormGroup){
        console.log(formData.value.score);
        let data = {
            doctorID : this.docID,
            patientID: this.id,
            score: formData.value.score,
            notes: formData.value.notes,
            date: this.date
        }
        console.log(data);
        this._PatientService.postpatientRate(data).subscribe((res)=>{
                console.log(res);
            },(err)=>{
                alert(err.error);
            });

        formData.reset();

      }

}
