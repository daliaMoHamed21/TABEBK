import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from 'src/app/Enums/Status';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class PatientSignInComponent {

    isLoading: boolean = false;
    apiError: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    signInForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })

    showAlert: boolean = false;

    handleSignIn() {
        if (this.signInForm.valid) {
            console.log(this.signInForm.value);
            this.authService.PatientAndDoctorSignIn(this.signInForm.value).subscribe({
                next: (Response) => {
                    if (Response.role === 'doctor') {
                        this.showAlert = true;
                        localStorage.setItem('role', Response.role)
                        localStorage.setItem("id", Response.id);
                        localStorage.setItem("status",Response.status)
                        this.authService.setRole(Response.role);
                        this.authService.setStatus(Response.status)
                        if(Response.status == Status.Active)
                        this.router.navigate(['/doctor/home'])
                        else if(Response.status == Status.Inactive)
                            this.router.navigate(['/doctor/inactive'])
                        else if(Response.status == Status.Rejected)
                            this.router.navigate(['/doctor/rejected'])
                        else if(Response.status == Status.Banned)
                            this.router.navigate(['/banned'])
                    }
                    if (Response.role === 'patient') {
                        this.showAlert = true;
                        localStorage.setItem('role', Response.role)
                        localStorage.setItem("id", Response.id);
                        localStorage.setItem("status",Response.status)
                        this.authService.setRole(Response.role);
                        this.authService.setStatus(Response.status)
                        if(Response.status == Status.Active)
                        this.router.navigate(['/patient/home'])
                        else if(Response.status == Status.Banned)
                            this.router.navigate(['/banned'])
                    }
                    if (Response.role === 'admin') {
                        this.showAlert = true;
                        localStorage.setItem('role', Response.role)
                        this.authService.setRole(Response.role);
                        this.router.navigate(['/home'])
                    }
                },
                error: (errors: HttpErrorResponse) => {
                    console.log(errors);
                    this.apiError = errors.error;
                }

            })
        }
        else {
            this.signInForm.markAllAsTouched();
        }
    }

    showPassword: boolean = false;

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

}
