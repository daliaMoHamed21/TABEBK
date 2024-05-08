import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Services/patient.service';
import { Status } from 'src/app/Enums/Status';
import { Gender } from 'src/app/Enums/Gender';
import { IPatient } from 'src/app/Models/i-patient';
import { IPatientAdd } from 'src/app/Models/patientAddDTO';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

    date: Date = new Date();
    dateMax: string = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];
    dateMin: string = new Date(this.date.getFullYear() - 100, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];

  constructor(private router: Router,private patientService: PatientService) { }

  ngOnInit(): void {
    if (this.role != "admin") {
        this.router.navigate(['unauthorized']);
    }
}

role: string = localStorage.getItem("role") ?? "";

  createForm:FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('', [Validators.required, Validators.email , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password : new FormControl(null),
      phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl(Gender.PreferNotToSay, [Validators.required]),
      status:new FormControl(Status.Active, [Validators.required]),
    })


handleAdd(createForm:FormGroup)
  {
    if(createForm.valid)
    {
      createForm.value.gender = +createForm.value.gender;
      createForm.value.status = +createForm.value.status;
      createForm.value.password = "123456789sS";
      createForm.value.phone = `${createForm.value.phone}`
      let patient : IPatient = createForm.value;
      let patientAdd : IPatientAdd = {
        patient : patient,
        password : createForm.value.password
      };
      console.log(patientAdd);

      this.patientService.addPatient(patientAdd).subscribe({
        next:(response) => {
          console.log('Patient added successfully:', response);
          this.router.navigate(['/patient/allpatients']);
        },
        error:(error) =>
        {
          console.error('Error adding patient:', error);
        }
      });
    }
    else
    {
      this.createForm.markAllAsTouched();
    }
}

enforceMinMaxPhone(el : any) {
    el = el.target;
    console.log(el.value.split("").length);
    if(el.value.split("").length > 10)
    {
        console.log(el.value.split("").slice(0,11).join(""));
        let elBefore = el.value.split("").slice(0,11).join("");
        this.createForm.controls['phone'].setValue(elBefore);
    }
  }


// addPatient(formData: FormGroup): void {
//   if (formData.valid) {
//     const newPatient: IPatient = {
//       Id: 0,
//       Name: formData.value.name,
//       Email: formData.value.email,
//       DOB: formData.value.dateOfBirth,
//       Gender: formData.value.gender,
//       Phone: formData.value.phone,
//       Status: formData.value.status,
//     };

//     console.log(newPatient);

//     this.patientService.addPatient(newPatient).subscribe(() => {
//       this.Patients.push();
//       formData.reset();
//       this.router.navigate(['/patient/allpatients']);
//     });
//   }
//   else
//   {
//     this.createForm.markAllAsTouched();
//   }
// }

}
