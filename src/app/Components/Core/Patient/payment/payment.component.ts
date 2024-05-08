import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  paymentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{0,16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // Updated pattern
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  get form() { return this.paymentForm.controls; }

  processPayment() {
    if (this.paymentForm.valid) {
      console.log('Processing payment:', this.paymentForm.value);
      // Send the paymentForm.value to your backend server for further processing

      // Reset the form after processing
      this.paymentForm.reset();
    } else {
      // Mark all fields as touched to display validation messages
      this.paymentForm.markAllAsTouched();
    }
  }

  limitCvvNumLength(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      const currentValue = inputElement.value;
      const maxLength = 4;

      if (currentValue.length > maxLength) {
        inputElement.value = currentValue.slice(0, maxLength);
        event.preventDefault(); // Cancel the input event
      }
  }


  limitCardNumLength(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    const maxLength = 16;

    if (currentValue.length > maxLength) {
      inputElement.value = currentValue.slice(0, maxLength);
      event.preventDefault(); // Cancel the input event
    }
}

}
