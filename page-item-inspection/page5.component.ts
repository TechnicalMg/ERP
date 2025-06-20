import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page5',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './page5.component.html',
  styleUrl: './page5.component.css'
})
export class Page5Component {

  formData = {
  distributor: '',
  gemPoNumber: '',
  referenceNo: '',
  inspectionPerson: '',
  otherInspectionPerson: false,
  inspectionType: '',
  newInspectionPerson: '',
  designation: '',
  agency: '',
  verifyAll: false,
  itemVerify: false,
  itemRemark: '',
  generalRemark: ''
};

onSave() {
  console.log('Form submitted:', this.formData);
  // Add logic to process form data
}

}
