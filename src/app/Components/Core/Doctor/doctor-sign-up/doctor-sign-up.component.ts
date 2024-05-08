import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { IDoctorAdd } from 'src/app/Models/doctorAddDTO';
import { IDoctor } from 'src/app/Models/i-doctor';
import { AuthService } from 'src/app/Services/auth.service';
import { DoctorService } from 'src/app/Services/doctor.service';


@Component({
    selector: 'app-doctor-sign-up',
    templateUrl: './doctor-sign-up.component.html',
    styleUrls: ['./doctor-sign-up.component.css']
})
export class DoctorSignUpComponent implements OnInit, AfterViewInit {

    apiError: string = '';
    egyptGovernorates: string[] = [
        "Ad Dakahlia",
        "Al Bahr al Ahmar",
        "Al Buhayrah",
        "Al Fayoum",
        "Al Gharbia",
        "Alexandria",
        "Aswan",
        "Assyut",
        "Beni Suef",
        "Cairo",
        "Daqahlia",
        "Damietta",
        "Faiyum",
        "Gharbia",
        "Giza",
        "Ismailia",
        "Kafr el-Sheikh",
        "Luxor",
        "Matruh",
        "Minya",
        "Monufia",
        "New Valley",
        "North Sinai",
        "Port Said",
        "Qalyubia",
        "Red Sea",
        "Sharqia",
        "South Sinai",
        "Suez",
        "Suhag",
    ];

    createForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private doctorService: DoctorService) {

        this.createForm = this.fb.group({
            Name: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
            Email: [null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
            password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*)(?=.*[^\s]).{8,}$/)]],
            confirmPassword: [null, [Validators.required]],
            NationalID: [null, [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
            SpecialityID: [null, [Validators.required]],
            Description: [null],
            DOB: [null, [Validators.required]],
            Gender: [Gender.Male, [Validators.required]],
            Governance: ["Monufia", [Validators.required]],
            Address: [null, [Validators.required]],
            Phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
            AppointmentPrice: [null, [Validators.required, Validators.min(100), Validators.max(5000)]],
            Status: [Status.Inactive],
            picPath:[null],
        }, { validator: this.passwordMatchValidator });
    }

    ngAfterViewInit(): void {
        this.getSpecialities();
    }

    enforceMinMaxPhone(el: any) {
        el = el.target;
        console.log(el.value.split("").length);
        if (el.value.split("").length > 10) {
            console.log(el.value.split("").slice(0, 11).join(""));
            let elBefore = el.value.split("").slice(0, 11).join("");
            this.createForm.controls['Phone'].setValue(elBefore);
        }
    }

    enforceMinMaxNationalID(el: any) {
        el = el.target;
        console.log(el.value.split("").length);
        if (el.value.split("").length > 13) {
            console.log(el.value.split("").slice(0, 14).join(""));
            let elBefore = el.value.split("").slice(0, 14).join("");
            this.createForm.controls['NationalID'].setValue(elBefore);
        }
    }


    specialities: any = [];
    selectedSpeciality!: number;
    date: Date = new Date();
    dateMax: string = new Date(this.date.getFullYear() - 25, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];
    dateMin: string = new Date(this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];


    gov: any = [];
    ngOnInit(): void {
        this.dateMax = new Date(this.date.getFullYear() - 25, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];
        this.dateMin = new Date(this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];

    }

    getSpecialities(): void {
        this.doctorService.getAllSpecialities().subscribe((res) => {


            this.specialities = res;


            console.log(res);
            console.log(this.specialities[0].Name);
        })
    }

    showAlert: boolean = false;

    handleAdd(createForm: FormGroup) {
        // this.showAlert = true;
        console.log(createForm.value);
        if (createForm.valid) {
            createForm.value.Gender = +createForm.value.Gender;
            createForm.value.Status = +createForm.value.Status;
            createForm.value.SpecialityID = +createForm.value.SpecialityID;
            let doctor: IDoctor = createForm.value;
            let doctorAdd: IDoctorAdd = {
                Doctor: doctor,
                password: createForm.value.password
            };

            this.doctorService.addDoctor(doctorAdd).subscribe({
                next: (response) => {
                    console.log('Doctor added successfully:', response);
                    this.showAlert = true;
                    this.router.navigate(['/signin']);
                },
                error: (error) => {
                    console.error(error);
                    this.apiError = error.error;
                }
            });
        }
        else {
            this.createForm.markAllAsTouched();
        }
    }


    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

    togglePasswordVisibility(field: string): void {
        if (field === 'password') {
            this.showPassword = !this.showPassword;
        } else if (field === 'confirmPassword') {
            this.showConfirmPassword = !this.showConfirmPassword;
        }
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;

        if (password !== confirmPassword && confirmPassword !== '') {
            formGroup.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
        } else {
            // Check if both password and confirm password are filled before resetting error
            if (password !== '' && confirmPassword !== '') {
                formGroup.get('confirmPassword')?.setErrors(null);
            }
        }
    }


}
