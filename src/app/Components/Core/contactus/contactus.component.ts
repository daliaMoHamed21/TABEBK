import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import emailjs from '@emailjs/browser'; 

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
    contactForm!: FormGroup;
    isSubmitted:boolean | undefined;
    
  
    constructor(private formBuilder: FormBuilder) { }
  
    ngOnInit(): void {
      this.contactForm = this.formBuilder.group({
        from_name:new FormControl ('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
        to_name:'Admin',
        from_email:new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)]),
        message: new FormControl('', [Validators.required,Validators.minLength(7)])
      });
    }
     get nameConttrol() {
      return this.contactForm.controls['from_name'];
    }
    get emailConttrol() {
      return this.contactForm.controls['from_email'];
    }
    get messageConttrol() {
      return this.contactForm.controls['message'];
    }
  
    
   async onSubmit(){
      this.isSubmitted = true;
      
      if (this.contactForm.valid) {
        emailjs.init('8ZSVh7DeWwFChSDnZ'); 
        let response= await  emailjs.send("service_8isna4r","template_g6t7tvk",{
          from_name: this.contactForm.value.from_name,
          to_name: this.contactForm.value.to_name,
          from_email: this.contactForm.value.from_email,
          message: this.contactForm.value.message,
        });
        alert('Message has been sent')
      
      
        this.contactForm.reset();
        this.isSubmitted = false;
      } else {
        // Form is invalid, handle validation errors
        console.log('Form is invalid. Please fill in all required fields correctly.');
      }
    
      
    }
  }