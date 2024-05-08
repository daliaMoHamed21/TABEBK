import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/Enums/Status';

@Component({
  selector: 'app-banned',
  templateUrl: './banned.component.html',
  styleUrls: ['./banned.component.css']
})
export class DoctorBannedComponent implements OnInit {
    constructor(private router : Router){}
    ngOnInit(): void {
        if (isNaN(this.id)) this.router.navigate(['signin']);
        if (this.status != Status.Banned) {
            this.router.navigate(['unauthorized']);
        }
    }
    id: number = parseInt(localStorage.getItem("id") ?? "");
    role: string = localStorage.getItem("role") ?? "";
    status: Status = parseInt(localStorage.getItem("status") ?? "") as Status;
}
