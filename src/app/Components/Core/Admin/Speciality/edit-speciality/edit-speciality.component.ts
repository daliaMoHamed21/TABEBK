import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Speciality } from 'src/app/Models/speciality';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-edit-speciality',
  templateUrl: './edit-speciality.component.html',
  styleUrls: ['./edit-speciality.component.css']
})
export class EditSpecialityComponent {

    specId: any;
    receivedSpec: any;
    role: string = localStorage.getItem("role") ?? "";



    constructor(private router: Router, private activatedroute: ActivatedRoute, private doctorService: DoctorService) {
        this.specId = this.activatedroute.snapshot.paramMap.get("specId");
        console.log(this.specId);

    }

    editForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
    });

    ngOnInit(): void {
        if (this.role != "admin") {
            this.router.navigate(['unauthorized']);
        }
        this.doctorService.getSpecialityById(this.specId).subscribe((res) => {
            console.log(res);
            this.receivedSpec = res;
            this.editForm.controls['id'].setValue(this.receivedSpec.id);
            this.editForm.controls['name'].setValue(this.receivedSpec.name);
        })
    }

    handleEdit(): void {
        console.log(this.editForm.valid)
        if (this.editForm.valid) {


            console.log(this.editForm);
            this.doctorService.editSpeciality(this.editForm.value as Speciality).subscribe({
                next: (response) => {
                    console.log('Edit added successfully:', response);
                    // this.handleUpdate();
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/speciality/allspecialities']); // Replace '/your-route' with the route you want to navigate to after editing
                    })
                },
                error: (error) => {
                    console.error(error);
                }
            });

        }
        else {
            this.editForm.markAllAsTouched();
        }

    }


}
