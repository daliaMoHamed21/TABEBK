import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPatient } from 'src/app/Models/i-patient';
import { PatientService } from 'src/app/Services/patient.service';
import { Status } from 'src/app/Enums/Status';
import { Router } from '@angular/router';

@Component({
    selector: 'app-all-patients',
    templateUrl: './all-patients.component.html',
    styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {

    headElements = ['Name', 'Email', 'Phone', 'DOB', 'Gender', 'Edit', 'Remove'];
    patients: IPatient[] = [];


    constructor(private patientService: PatientService, private router: Router) { }


    ngOnInit(): void {
        this.loadPatients();
        if (this.role != "admin") {
            this.router.navigate(['unauthorized']);
        }
    }

    role: string = localStorage.getItem("role") ?? "";

    loadPatients(): void {
        this.patientService.getAllPatients().subscribe((Patients: IPatient[]) => {
            this.patients = Patients;
            console.log(this.patients);

        });
    }

    navDoc(patId: any) {
        console.log(patId);
        this.router.navigate([`/patient/edit/${patId}`]);

    }

    deletePat(patId: any): void {
        if (confirm('Are you sure you want to delete this patient?')) {
            this.patientService.deletePatient(patId).subscribe({
                next: (response) => {
                    console.log('Patient deleted successfully:', response);
                    window.location.reload();
                },
                error: (error) => {
                    console.error('Error deleting patient:', error);
                }
            });
        }
    }


}
