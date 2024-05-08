import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/Enums/Status';

@Component({
  selector: 'app-doctor-reject',
  templateUrl: './doctor-reject.component.html',
  styleUrls: ['./doctor-reject.component.css']
})
export class DoctorRejectComponent implements OnInit {
    constructor(private router:Router){}
    ngOnInit(): void {
        if(this.status != Status.Rejected || this.role != "doctor"){
            this.router.navigate(['unauthorized']);
        }
    }
    id: number = parseInt(localStorage.getItem("id") ?? "");
    role: string = localStorage.getItem("role") ?? "";
    status: Status = parseInt(localStorage.getItem("status")??"") as Status;

    
}
