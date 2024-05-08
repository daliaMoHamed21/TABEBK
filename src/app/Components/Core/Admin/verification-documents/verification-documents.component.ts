import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/Enums/Status';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-verification-documents',
  templateUrl: './verification-documents.component.html',
  styleUrls: ['./verification-documents.component.css']
})
export class VerificationDocumentsComponent {

    constructor(private router: Router, private docService: DoctorService, private activatedroute : ActivatedRoute) { }
    ngOnInit(): void {
        if (this.role != "admin") {
            this.router.navigate(['unauthorized']);
        }
        if(isNaN(this.docID)) this.router.navigate(['notfound']);
        this.docService.GetNidCert(this.docID).subscribe((res) => {
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
    docID: number = parseInt(this.activatedroute.snapshot.paramMap.get("docId") ?? "");
    role: string = localStorage.getItem("role") ?? "";
    status: Status = parseInt(localStorage.getItem("status") ?? "") as Status;
    nid: boolean = false;
    cert: boolean = false;
    certificates: any;
    nidDoc:any;
}
