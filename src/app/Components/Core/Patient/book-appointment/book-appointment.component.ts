import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAppointment } from 'src/app/Models/appointment';
import { IDoctor } from 'src/app/Models/i-doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {

    // Doctors: IDoctor[] = [];

    // appointments : IAppointment[] = [];

    // id: any = localStorage.getItem("id") ?? "";

    // constructor(private doctorService: DoctorService ,private router :Router) {}


    // ngAfterViewInit(): void {
    //     this.loadDoctors();
    //   }
    
    //   loadDoctors(): void {
    //     this.doctorService.getDoctorById(this.id).subscribe(() => {
    //       this.Doctors = this.id;
    //       console.log(this.Doctors);
    
    //     });
    //   }
}
