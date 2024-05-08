import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Speciality } from 'src/app/Models/speciality';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-add-speciality',
  templateUrl: './add-speciality.component.html',
  styleUrls: ['./add-speciality.component.css']
})
export class AddSpecialityComponent implements OnInit{

    role: string = localStorage.getItem("role") ?? "";
    
    constructor(private doctorService: DoctorService,private router :Router) { }


    ngOnInit(): void {
        if (this.role != "admin") {
            this.router.navigate(['unauthorized']);
        }
    }

    createForm:FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
      })

      handleAdd(createForm:FormGroup)
      {
        if(createForm.valid)
        {
          this.doctorService.addSpeciality(createForm.value).subscribe({
            next:(response) => {
              console.log('Speciality added successfully:', response);
              this.router.navigate(['/speciality/allspecialities']);
            },
            error:(error) =>
            {
              console.error('Error adding Speciality:', error);
            }
          });
        }
        else
        {
          this.createForm.markAllAsTouched();
        }
    }  

}
