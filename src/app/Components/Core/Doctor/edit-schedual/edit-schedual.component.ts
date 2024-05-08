import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Status } from 'src/app/Enums/Status';
import { min } from 'rxjs';

@Component({
    selector: 'app-edit-schedual',
    templateUrl: './edit-schedual.component.html',
    styleUrls: ['./edit-schedual.component.css']
})
export class EditSchedualComponent implements OnInit {
    doctorID: number = parseInt(localStorage.getItem('id') ?? '');
    role: string = localStorage.getItem("role") ?? "";
    status: Status = parseInt(localStorage.getItem("status") ?? "") as Status;
    editSchedualForm: FormGroup;
    recePat: any | null = null;
    schID : number | undefined;

    constructor(
        private router: Router,
        private _DoctorService: DoctorService,
        private formBuilder: FormBuilder,
        private activatedroute: ActivatedRoute,
    ) {
        this.editSchedualForm = this.formBuilder.group({
            saturdayStart: [null, Validators.required],
            saturdayEnd: [null, Validators.required],
            sundayStart: [null, Validators.required],
            sundayEnd: [null, Validators.required],
            mondayStart: [null, Validators.required],
            mondayEnd: [null, Validators.required],
            tuesdayStart: [null, Validators.required],
            tuesdayEnd: [null, Validators.required],
            wednesdayStart: [null, Validators.required],
            wednesdayEnd: [null, Validators.required],
            thursdayStart: [null, Validators.required],
            thursdayEnd: [null, Validators.required],
            fridayStart: [null, Validators.required],
            fridayEnd: [null, Validators.required],
            saturdayDisabled: [false],
            sundayDisabled: [false],
            mondayDisabled: [false],
            tuesdayDisabled: [false],
            wednesdayDisabled: [false],
            thursdayDisabled: [false],
            fridayDisabled: [false],
        });
    }



    ngOnInit(): void {

        if (isNaN(this.doctorID)) this.router.navigate(['signin']);
        if (this.role != "doctor") {
            this.router.navigate(['unauthorized']);
        }
        if (this.status == Status.Rejected) this.router.navigate(['doctor/rejected']);
        if (this.status == Status.Inactive) this.router.navigate(['doctor/inactive']);
        if (this.status == Status.Banned) this.router.navigate(['banned']);
        this._DoctorService.getSchedule(this.doctorID).subscribe(res => {
            this.recePat = res;
            this.schID = res.id;
            let day;
            console.log(res);
            if (res.saturday == 0) {
                this.editSchedualForm.controls['saturdayDisabled'].setValue(true);
            }
            else {
                this.editSchedualForm.controls["saturdayStart"].setValue(this.getTime(res.saturday, 0));
                this.editSchedualForm.controls["saturdayEnd"].setValue(this.getTime(res.saturday, 1));
            }

            if (res.sunday == 0) {
                this.editSchedualForm.controls['sundayDisabled'].setValue(true);
            }
            else {
                this.editSchedualForm.controls["sundayStart"].setValue(this.getTime(res.sunday, 0));
                this.editSchedualForm.controls["sundayEnd"].setValue(this.getTime(res.sunday, 1));
            }

            if (res.monday == 0) {
                this.editSchedualForm.controls['mondayDisabled'].setValue(true);
            }
            else {
                this.editSchedualForm.controls["mondayStart"].setValue(this.getTime(res.monday, 0));
                this.editSchedualForm.controls["mondayEnd"].setValue(this.getTime(res.monday, 1));
            }

            if (res.tuesday == 0) {
                this.editSchedualForm.controls['tuesdayDisabled'].setValue(true);
            }
            else {
                this.editSchedualForm.controls["tuesdayStart"].setValue(this.getTime(res.tuesday, 0));
                this.editSchedualForm.controls["tuesdayEnd"].setValue(this.getTime(res.tuesday, 1));
            }

            if (res.wednesday == 0) {
                this.editSchedualForm.controls['wednesdayDisabled'].setValue(true);
            }
            else {
                this.editSchedualForm.controls["wednesdayStart"].setValue(this.getTime(res.wednesday, 0));
                this.editSchedualForm.controls["wednesdayEnd"].setValue(this.getTime(res.wednesday, 1));
            }

            if (res.thursday == 0) {
                this.editSchedualForm.controls['thursdayDisabled'].setValue(true);
            }
            else {
                this.editSchedualForm.controls["thursdayStart"].setValue(this.getTime(res.thursday, 0));
                this.editSchedualForm.controls["thursdayEnd"].setValue(this.getTime(res.thursday, 1));
            }

            if (res.friday == 0) {
                this.editSchedualForm.controls['fridayDisabled'].setValue(true);
            }
            else {
                this.editSchedualForm.controls["fridayStart"].setValue(this.getTime(res.friday, 0));
                this.editSchedualForm.controls["fridayEnd"].setValue(this.getTime(res.friday, 1));
            }

        });


    }

    getTime(time: string, index: number) {
        let dayStart = time.split("-")[index].trim();
        let hour = parseInt(dayStart.split(":")[0]);
        if (dayStart.split(" ")[1] == "PM" && hour != 12) {
            hour += 12;
        }
        if (dayStart.split(" ")[1] == "AM" && hour == 12) {
            hour = 0;
        }
        let minutes = parseInt(dayStart.split(":")[1].split(" ")[0]);
        let date = new Date();
        let dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDay(), hour, minutes);
        return dateStart.toTimeString().split(" ")[0];
    }

    convert2Time(time: string) {
        let timeNow = time;
        let hour = parseInt(timeNow.split(":")[0]);
        let minutes = parseInt(timeNow.split(":")[1]);
        let date = new Date();
        let dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDay(), hour, minutes);
        let timeFinal = dateStart.toLocaleTimeString().split(" ")[0];
        let time1stPart = timeFinal.split(" ")[0];
        let Finaltime = `${time1stPart.split(":")[0]}:${time1stPart.split(":")[1]} ${dateStart.toLocaleTimeString().split(" ")[1]}`
        return Finaltime;
    }

    handleEdit(): void {

            const formData = this.editSchedualForm.value;
            console.log(formData.saturdayStart)
            const dataToSend = {
                id:this.schID,
                saturday: this.editSchedualForm.value.saturdayDisabled == true ? "0" : `${this.convert2Time(this.editSchedualForm.value.saturdayStart)} - ${this.convert2Time(this.editSchedualForm.value.saturdayEnd)}`,
                sunday: this.editSchedualForm.value.sundayDisabled == true ? "0" : `${this.convert2Time(this.editSchedualForm.value.sundayStart)} - ${this.convert2Time(this.editSchedualForm.value.sundayEnd)}`,
                monday: this.editSchedualForm.value.mondayDisabled == true ? "0" : `${this.convert2Time(this.editSchedualForm.value.mondayStart)} - ${this.convert2Time(this.editSchedualForm.value.mondayEnd)}`,
                tuesday: this.editSchedualForm.value.tuesdayDisabled == true ? "0" : `${this.convert2Time(this.editSchedualForm.value.tuesdayStart)} - ${this.convert2Time(this.editSchedualForm.value.tuesdayEnd)}`,
                wednesday: this.editSchedualForm.value.wednesdayDisabled == true ? "0" : `${this.convert2Time(this.editSchedualForm.value.wednesdayStart)} - ${this.convert2Time(this.editSchedualForm.value.wednesdayEnd)}`,
                thursday: this.editSchedualForm.value.thursdayDisabled == true ? "0" : `${this.convert2Time(this.editSchedualForm.value.thursdayStart)} - ${this.convert2Time(this.editSchedualForm.value.thursdayEnd)}`,
                friday: this.editSchedualForm.value.fridayDisabled == true ? "0" : `${this.convert2Time(this.editSchedualForm.value.fridayStart)} - ${this.convert2Time(this.editSchedualForm.value.fridayEnd)}`,
                doctorID: this.doctorID
            };

            console.log(dataToSend)


            this._DoctorService.editSchedule(dataToSend).subscribe({
                next: (res) => {
                    console.log(res);
                    console.log('Edit added successfully:', res)
                    this.router.navigate(['doctor/profile']);
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            });
    }

    formatTimeToString(time: Date): string {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return (` ${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
    }
}
