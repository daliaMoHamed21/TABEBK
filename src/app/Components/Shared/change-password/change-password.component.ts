import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPatient } from 'src/app/Models/i-patient';
import { AuthService } from 'src/app/Services/auth.service';
import { ChangePass } from './../../../Models/changePass';
import { loginDTO } from 'src/app/Models/logindto';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

    isLoading: boolean = false;
    apiError: string = '';

    id: any = localStorage.getItem("id") ?? "";
    userRole: any = localStorage.getItem("role") ?? "";

    changeForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        // Initialize FormGroup with FormBuilder
        // , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*)(?=.*[^\s]).{8,}$/)]
        this.changeForm = this.fb.group({
            userID: this.id,
            userRole: this.userRole,
            password: [null, [Validators.required]],
            newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*)(?=.*[^\s]).{8,}$/)]],
        }, { validator: this.passwordMatchValidator });
    }

    showAlert: boolean = false;

    handleChangePass() {
        if (this.changeForm.valid) {
            console.log(this.changeForm.value);
            this.authService.ChangePassword(this.changeForm.value).subscribe({
                next: (Response) => {
                    console.log(Response);

                    if (Response.userRole === 'doctor') {
                        this.showAlert = true;
                        console.log(this.changeForm.value);
                        this.router.navigate(['/doctor/home'])
                    }
                    if (Response.userRole === 'patient') {
                        this.showAlert = true;
                        console.log(this.changeForm.value);
                        this.router.navigate(['/patient/home'])
                    }
                },
                error: (errors: HttpErrorResponse) => {
                    console.log(errors);
                    this.apiError = errors.error;
                }

            })
        }
        else {
            this.changeForm.markAllAsTouched();
        }

    }


    showOldPassword: boolean = false;
    showNewPassword: boolean = false;
    showConfirmPassword: boolean = false;

    togglePasswordVisibility(field: string): void {
        if (field === 'oldPassword') {
            this.showOldPassword = !this.showOldPassword;
        } else if (field === 'newPassword') {
            this.showNewPassword = !this.showNewPassword;
        } else if (field === 'confirmPassword') {
            this.showConfirmPassword = !this.showConfirmPassword;
        }
    }
    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('newPassword')?.value;
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
