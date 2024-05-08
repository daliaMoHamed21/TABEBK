import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  id:number = parseInt(localStorage.getItem("id") ?? "");
  role:string = localStorage.getItem("role") ?? "";
  patientProfile:any;
  rateDialog: boolean = false;
  selectedRating:any;
  additionalNotes: string = '';
  rateForm!: FormGroup;
  constructor(private _PatientService:PatientService , private router:Router) {



  }
  ngOnInit(): void {
        if (isNaN(this.id)) this.router.navigate(['signin']);
        if (this.role != "patient") {
            this.router.navigate(['unauthorized']);
        }
    this._PatientService.getpatientProfileById(this.id).subscribe((res)=>{
      this.patientProfile=res;
      console.log(this.patientProfile);

    });


  }
  showDialog() {

    this.rateDialog= true;
  }


  submitRating(form: any) {
    // Process your form submission here
    console.log("Submitted Rating:", this.selectedRating);
    console.log("Additional Notes:", this.additionalNotes);
    console.log(form.value);
    // this._PatientService.postpatientRate(form.value).subscribe((res)=>{
    //   console.log(res);
    // });


    // Reset the form after submission
    form.resetForm();

  }

  navDoc(patId :any)
  {
    console.log(patId);
    this.router.navigate([`/patient/profile/edit/${patId}`]);

  }

  chanePass(patId :any)
  {
    console.log(patId);
    this.router.navigate([`/changepass/${patId}`]);

  }

}
