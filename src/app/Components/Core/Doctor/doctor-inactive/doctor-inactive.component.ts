import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentType } from 'src/app/Enums/DocumentType';
import { Status } from 'src/app/Enums/Status';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
    selector: 'app-doctor-inactive',
    templateUrl: './doctor-inactive.component.html',
    styleUrls: ['./doctor-inactive.component.css']
})
export class DoctorInactiveComponent implements OnInit {
    constructor(private router: Router, private docService: DoctorService) { }
    ngOnInit(): void {
        if (isNaN(this.id)) this.router.navigate(['signin']);
        if (this.status != Status.Inactive || this.role != "doctor") {
            this.router.navigate(['unauthorized']);
        }
        this.docService.GetNidCert(this.id).subscribe((res) => {
            console.log(res);
            this.nid = res.nid != null;
            this.cert = res.certificates != null;
            this.certificates = res.certificates;
            this.nidDoc = res.nid;
        },
            (err) => {
                console.log(err);
            });
    }
    id: number = parseInt(localStorage.getItem("id") ?? "");
    role: string = localStorage.getItem("role") ?? "";
    status: Status = parseInt(localStorage.getItem("status") ?? "") as Status;
    nid: boolean = false;
    cert: boolean = false;
    certificates: any;
    nidDoc:any;


    @ViewChild("file") file: ElementRef | undefined;
    uploadEvent() {
        this.file?.nativeElement.click()
    }
    @ViewChild("certAdd") certAdd: ElementRef | undefined;
    uploadCertEvent() {

        this.certAdd?.nativeElement.click()
    }

    uploadPicture(e: Event) {
        let target = e.currentTarget as HTMLInputElement;
        let form: FormData = new FormData();
        form.append("doctorID", `${this.id}`);
        if (target.files)
            form.append("document", target.files[0]);
        form.append("doctype", `${DocumentType.NationalID}`);
        console.log(form.getAll("docType"));
        this.docService.addCertificate(form).subscribe((res) => {
            console.log(res)
            this.docService.GetNidCert(this.id).subscribe((res) => {
                console.log(res);
                this.nid = res.nid != null;
                this.cert = res.certificates != null;
                this.certificates = res.certificates;
            },
                (err) => {
                    console.log(err);
                    alert(err.error);
                });
        }, 
        (err) => {
            console.log(err);
            alert(err.error);
        });
    }

    uploadCert(e: Event) {
        let target = e.target as HTMLInputElement;
        let form: FormData = new FormData();
        form.append("doctorID", `${this.id}`);
        if (target.files)
            form.append("document", target.files[0]);
        form.append("doctype", `${DocumentType.Certificate}`);
        this.docService.addCertificate(form).subscribe((res) => {
            console.log(res)
            this.docService.GetNidCert(this.id).subscribe((res) => {
                console.log(res);
                this.nid = res.nid != null;
                this.cert = res.certificates != null;
                this.certificates = res.certificates;
                this.nidDoc = res.nid;
            },
                (err) => {
                    console.log(err);
                    alert(err.error);
                });
        },
        (err) => {
            console.log(err);
            alert(err.error);
        });
    }
}
