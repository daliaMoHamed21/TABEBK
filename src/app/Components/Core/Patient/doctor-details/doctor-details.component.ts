import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAppointment } from 'src/app/Models/appointment';
import { IDoctor } from 'src/app/Models/i-doctor';
import { DoctorService } from 'src/app/Services/doctor.service';


@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent {

    Doctors: IDoctor[] = [];
    searchtext :any;

    constructor(private doctorService: DoctorService ,private router :Router) {}



    ngAfterViewInit(): void {
        this.loadDoctors();
      }
    
      loadDoctors(): void {
        this.doctorService.getAllDoctors().subscribe((doctors: IDoctor[]) => {
          this.Doctors = doctors;
          console.log(this.Doctors);
    
        });
      }


}
