import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speciality } from 'src/app/Models/speciality';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-all-speciality',
  templateUrl: './all-speciality.component.html',
  styleUrls: ['./all-speciality.component.css']
})
export class AllSpecialityComponent implements OnInit{


    Specialities :Speciality [] = [];
    role: string = localStorage.getItem("role") ?? "";
    

    constructor(private doctorService: DoctorService,private router :Router) { }


    ngOnInit(): void {
        this.getSpecialities();
        if (this.role != "admin") {
            this.router.navigate(['unauthorized']);
        }
    }

    getSpecialities(): void {
        this.doctorService.getAllSpecialities().subscribe((specialities: Speciality[]) => {
            this.Specialities = specialities;
            console.log(this.Specialities);

        });
    }

    editSpec(specId :any){
        console.log(specId);
        this.router.navigate([`/speciality/edit/${specId}`]);

    }

    deleteSpec(specId :any): void {
        if (confirm('Are you sure you want to delete this speciality?')) {
            this.doctorService.deleteSpeciality(specId).subscribe({
                next: (response) => {
                    console.log('speciality deleted successfully:', response);
                    window.location.reload();
                },
                error: (error) => {
                    console.error('Error deleting speciality:', error);
                }
            });
        }
    }

}
