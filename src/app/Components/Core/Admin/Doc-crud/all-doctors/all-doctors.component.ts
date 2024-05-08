import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDoctor } from 'src/app/Models/i-doctor';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Status } from 'src/app/Enums/Status';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-all-doctors',
    templateUrl: './all-doctors.component.html',
    styleUrls: ['./all-doctors.component.css']
})
export class AllDoctorsComponent implements AfterViewInit, OnInit {

    headElements = ['Name', 'Email', 'password', 'National ID', 'Specialty', 'DOB', 'Gender', 'Governorate', 'Address', 'Phone', 'AppointmentPrice', 'Edit', 'Remove'];

    Doctors: IDoctor[] = [];

    constructor(private doctorService: DoctorService, private router: Router, private userService: UserService) { }
    ngOnInit(): void {
        if (this.role != "admin") {
            this.router.navigate(['unauthorized']);
        }
    }

    role: string = localStorage.getItem("role") ?? "";
    ngAfterViewInit(): void {
        this.loadDoctors();
    }

    loadDoctors(): void {
        this.doctorService.getAllDoctors().subscribe((doctors: IDoctor[]) => {
            this.Doctors = doctors;
            console.log(this.Doctors);

        });
    }

    ActivateAccount(id: number) {
        let userinfo = {
            id: id,
            type: "Doctor"
        }
        this.userService.ActivateAccount(userinfo).subscribe((res) => {
            console.log(res);
            this.loadDoctors();
        },
            (err) => {
                console.log(err);
            })
    }

    RejectAccount(id: number) {
        let userinfo = {
            id: id,
            type: "Doctor"
        }
        this.userService.RejectAccount(userinfo).subscribe((res) => {
            console.log(res);
            this.loadDoctors();
        },
            (err) => {
                console.log(err);
            })
    }

    BanAccount(id: number) {
        let userinfo = {
            id: id,
            type: "Doctor"
        }
        this.userService.BanAccount(userinfo).subscribe((res) => {
            console.log(res);
            this.loadDoctors();
        },
            (err) => {
                console.log(err);
            })
    }

    navDoc(docId: any) {
        console.log(docId);
        this.router.navigate([`/doctor/edit/${docId}`]);

    }


    deleteDoc(docId: any): void {
        if (confirm('Are you sure you want to delete this doctor?')) {
            this.doctorService.deleteDoctor(docId).subscribe({
                next: (response) => {
                    console.log('Doctor deleted successfully:', response);
                    window.location.reload();
                },
                error: (error) => {
                    console.error('Error deleting doctor:', error);
                    // Handle error accordingly (e.g., display error message)
                }
            });
        }
    }

}
