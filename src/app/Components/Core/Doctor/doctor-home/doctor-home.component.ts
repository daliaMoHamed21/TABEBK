import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/Enums/Status';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent {

    backgroundUrl: any = 'assets/home/Vector.png';

    id:number = parseInt(localStorage.getItem("id") ?? "");
    role:string = localStorage.getItem("role") ?? "";
    constructor(private router:Router) { }
    status: Status = parseInt(localStorage.getItem("status")??"") as Status;
    ngOnInit(): void {
        if (isNaN(this.id)) this.router.navigate(['signin']);
        if (this.role != "doctor") {
            this.router.navigate(['unauthorized']);
        }
        if (this.status == Status.Rejected) this.router.navigate(['doctor/rejected']);
        if (this.status == Status.Inactive) this.router.navigate(['doctor/inactive']);
        if (this.status == Status.Banned) this.router.navigate(['banned']);
    }
}
