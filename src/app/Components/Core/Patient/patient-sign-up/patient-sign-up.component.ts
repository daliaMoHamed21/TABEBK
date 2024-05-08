import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { IPatient } from 'src/app/Models/i-patient';
import { IPatientAdd } from 'src/app/Models/patientAddDTO';
import { AuthService } from 'src/app/Services/auth.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
    selector: 'app-patient-sign-up',
    templateUrl: './patient-sign-up.component.html',
    styleUrls: ['./patient-sign-up.component.css']
})
export class PatientSignUpComponent {


    date: Date = new Date();
    dateMax: string = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];
    dateMin: string = new Date(this.date.getFullYear() - 100, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];

    createForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private patientService: PatientService) {
        // Initialize FormGroup with FormBuilder
        this.createForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
            email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
            password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*)(?=.*[^\s]).{8,}$/)]],
            confirmPassword: [null, [Validators.required]],
            phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
            dob: ['', [Validators.required]],
            gender: [Gender.PreferNotToSay, [Validators.required]],
            status: [Status.Active, [Validators.required]],
        }, { validator: this.passwordMatchValidator });
    }

    showAlert: boolean = false;

    handleAdd(createForm: FormGroup) {
        // this.showAlert = true;
        if (createForm.valid) {
            createForm.value.gender = +createForm.value.gender;
            createForm.value.status = +createForm.value.status;
            // createForm.value.password = +createForm.value.password;
            createForm.value.phone = `${createForm.value.phone}`
            let patient: IPatient = createForm.value;
            let patientAdd: IPatientAdd = {
                patient: patient,
                password: createForm.value.password
            };
            console.log(patientAdd);

            this.patientService.addPatient(patientAdd).subscribe({
                next: (response) => {
                    console.log('Patient added successfully:', response);
                    this.router.navigate(['/signin']);
                },
                error: (error) => {
                    console.error('Error adding patient:', error);
                }
            });
        }
        else {
            this.createForm.markAllAsTouched();
        }
    }

    enforceMinMaxPhone(el: any) {
        el = el.target;
        console.log(el.value.split("").length);
        if (el.value.split("").length > 10) {
            console.log(el.value.split("").slice(0, 11).join(""));
            let elBefore = el.value.split("").slice(0, 11).join("");
            this.createForm.controls['phone'].setValue(elBefore);
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
