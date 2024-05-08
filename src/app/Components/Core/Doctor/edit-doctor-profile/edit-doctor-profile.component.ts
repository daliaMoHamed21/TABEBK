import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-edit-doctor-profile',
  templateUrl: './edit-doctor-profile.component.html',
  styleUrls: ['./edit-doctor-profile.component.css']
})
export class EditDoctorProfileComponent implements AfterViewInit, OnInit {

  docId :any = localStorage.getItem("id") ?? "";
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
  date: Date = new Date();
  dateMax: string = new Date(this.date.getFullYear() - 25, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];
  dateMin: string = new Date(this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay()).toISOString().split("T")[0];

  receDoc: any;

  //  handleUpdate(){}
  constructor(private router: Router, private activatedroute: ActivatedRoute, private doctorService: DoctorService) {
      this.docId = this.activatedroute.snapshot.paramMap.get("docId");
      console.log(this.docId);
  }
  id:number = parseInt(localStorage.getItem("id") ?? "");
  role:string = localStorage.getItem("role") ?? "";
  status: Status = parseInt(localStorage.getItem("status")??"") as Status;
  ngOnInit(): void {
      if (isNaN(this.id)) this.router.navigate(['signin']);
      if (this.role != "doctor") {
          this.router.navigate(['unauthorized']);
      }
      if (this.status == Status.Rejected) this.router.navigate(['doctor/rejected']);
      if (this.status == Status.Inactive) this.router.navigate(['doctor/inactive']);
      if (this.status == Status.Banned) this.router.navigate(['banned']);
  }

  editForm: FormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      nationalId: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{14}$/)]),
      specialityID: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      gender: new FormControl(Gender.Male, [Validators.required]),
      governance: new FormControl("Monufia", [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      appointmentPrice: new FormControl(null, [Validators.required, Validators.min(100), Validators.max(5000)]),
      status: new FormControl(Status.Active),
  });

  ngAfterViewInit(): void {

      this.getSpecialities()

      this.doctorService.getDoctorById(this.docId).subscribe((res) => {
          console.log(res);

          this.receDoc = res;
          this.editForm.controls['id'].setValue(this.receDoc.id);
          this.editForm.controls['name'].setValue(this.receDoc.name);
          this.editForm.controls['email'].setValue(this.receDoc.email)
          this.editForm.controls['nationalId'].setValue(this.receDoc.nationalID),
          this.editForm.controls['dob'].setValue(new Date(res.dob).toLocaleDateString("en-CA"));
          this.editForm.controls['governance'].setValue(this.receDoc.governance)
          this.editForm.controls['gender'].setValue(this.receDoc.gender)
          this.editForm.controls['address'].setValue(this.receDoc.address)
          this.editForm.controls['specialityID'].setValue(this.receDoc.specialityID)
          this.editForm.controls['phone'].setValue(this.receDoc.phone)
          this.editForm.controls['appointmentPrice'].setValue(this.receDoc.appointmentPrice)
          this.editForm.controls['status'].setValue(this.receDoc.status)
      })
  }


  specialities: any = [];
  selectedSpeciality!: number;

  getSpecialities(): void {
      this.doctorService.getAllSpecialities().subscribe((res) => {


          this.specialities = res;


          console.log(res);
          console.log(this.specialities[0].name);
      })
  }


  handleEdit(): void {
      console.log(this.editForm.valid)
      if (this.editForm.valid) {


          this.editForm.value.gender = +this.editForm.value.gender;
          this.editForm.value.status = +this.editForm.value.status;
          this.editForm.value.specialityID = +this.editForm.value.specialityID;
          this.editForm.value.phone = `${this.editForm.value.phone}`;
          this.editForm.value.nationalId = `${this.editForm.value.nationalId}`;
          console.log(this.editForm);
          this.doctorService.editDoctor(this.editForm.value).subscribe({
              next: (response) => {
                  console.log('Edit added successfully:', response);
                  // this.handleUpdate();
                  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate(['/doctor/profile']); // Replace '/your-route' with the route you want to navigate to after editing
                  })
              },
              error: (error) => {
                  console.error(error);
                  this.apiError = error.error;
              }
          });

      }
      else {
          this.editForm.markAllAsTouched();
      }

  }

   enforceMinMaxPhone(el : any) {
      el = el.target;
      console.log(el.value.split("").length);
      if(el.value.split("").length > 10)
      {
          console.log(el.value.split("").slice(0,11).join(""));
          let elBefore = el.value.split("").slice(0,11).join("");
          this.editForm.controls['phone'].setValue(elBefore);
      }
    }

    enforceMinMaxNationalID(el : any) {
      el = el.target;
      console.log(el.value.split("").length);
      if(el.value.split("").length > 13)
      {
          console.log(el.value.split("").slice(0,14).join(""));
          let elBefore = el.value.split("").slice(0,14).join("");
          this.editForm.controls['nationalId'].setValue(elBefore);
      }
    }

}
