import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{


  // isAdmin:boolean = false;
  // isDoc:boolean = false;

  // isPat:boolean = false;

  isLogin : boolean = false;

  id : any = localStorage.getItem("id") ?? "";

  role : string = localStorage.getItem("role") ?? "";


  constructor(private router : Router, public authService:AuthService){}

  


  ngOnInit(): void {


    // if(this.role === 'admin')
    // {

    // }


  }

  // // NavLog()
  // // {
  // //   this.authService.PatientAndDoctorSignIn(this.id).subscribe({
  // //     next:(Response)=>{
  // //       if(Response.role === 'doctor'){
  // //         localStorage.setItem('role' , Response.role)
  // //         localStorage.setItem("id",Response.id);
  // //         this.router.navigate(['/doctor/profile'])
  // //         }
  // //         if(Response .role === 'patient'){
  // //           localStorage.setItem('role' , Response.role)
  // //           localStorage.setItem("id",Response.id);
  // //           this.router.navigate(['/patient/profile'])
  // //         }
  // //         if(Response .role === 'admin'){
  // //          localStorage.setItem('role' , Response.role)
  // //          this.router.navigate(['/home'])
  // //        }

  // //       }
  // //   })
  // // }


// this.authService.PatientAndDoctorSignIn(this.id).subscribe({
//   next:(Response)=>{
//     if(Response.role === 'doctor'){
//       localStorage.setItem('role' , Response.role)
//       localStorage.setItem("id",Response.id);
//       this.router.navigate(['/doctor/profile'])
//       }
//       if(Response .role === 'patient'){
//         localStorage.setItem('role' , Response.role)
//         localStorage.setItem("id",Response.id);
//         this.router.navigate(['/patient/profile'])
//       }
//       if(Response .role === 'admin'){
//        localStorage.setItem('role' , Response.role)
//        this.router.navigate(['/home'])
//      }

//     }
// })



// this.authService.userData.subscribe({
//   next:() => {
//     if(this.authService.userData.getValue() === "")
//     {
//       this.isLogin = false;
//     }
//     if(this.authService.userData.getValue() === "admin")
//     {
//       this.isLogin = true;
//     }
//     if(this.authService.userData.getValue() === "doctor")
//     {
//       this.isLogin = true;
//     }
//     if(this.authService.userData.getValue() === "patient")
//     {
//       this.isLogin = true;
//     }
//   }
// })



  Logout()
  {
    // localStorage.removeItem();
    localStorage.clear();
    this.authService.setRole("");
    // this.authService.userData.next(null);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/signin']); // Replace '/your-route' with the route you want to navigate to after editing
    })
    // this.router.navigate(['/signin']);
    // window.location.reload();
  }


}
