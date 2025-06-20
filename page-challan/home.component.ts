import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  formData = {
    distributor: '',
    gemPoNumber: '',
    referenceNo: '',
    deliveryStartDate: '',
    deliveryEndDate: '',
    challanNumber: '',
    challanDate: '',
    poGeneratedDate: '23-01-2024',
    vehicleNumber: '',
    courierName: '',
    courierPODNo: '',
    shipTo: ''
  };

  totalBoxes = 5;
  totalValue = 10000;
  uploadedFileName = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // If you're using reactive forms additionally
    // Initialize if needed — your current form uses template-driven ngModel
  }

  onSave() {
    console.log('Form submitted:', this.formData);
    // Add form submission logic here (e.g. API call)
  }

  openDatePicker(event: any) {
    if (event.target && event.target.showPicker) {
      event.target.showPicker();
    }
  }

  handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFileName = file.name;
    }
  }
}
