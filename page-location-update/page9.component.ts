import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page9',
  imports: [FormsModule,CommonModule],
  templateUrl: './page9.component.html',
  styleUrl: './page9.component.css'
})
export class Page9Component implements OnInit{
  
  poOptions = ['PO123', 'PO456', 'PO789'];
  challanOptions = ['CH001', 'CH002', 'CH003'];

  states = ['Telangana', 'Karnataka', 'Maharashtra'];
  districts = ['Hyderabad', 'Bengaluru', 'Pune'];

  selectedPoNo: string = '';
  selectedChallan: string = '';

  showContainer: boolean = false;
  notSameAddress: boolean = false;

  deliveryAddress = {
    line1: '',
    line2: '',
    state: '',
    district: '',
    pin: ''
  };

  installationAddress = {
    line1: '',
    line2: '',
    state: '',
    district: '',
    pin: ''
  };

  tableData = [
    { name: 'Item A', serial: 'A001' },
    { name: 'Item B', serial: 'B002' },
    { name: 'Item C', serial: 'C003' }
  ];

  ngOnInit(): void {
    // Simulate fetch delivery address (replace with API later)
    this.deliveryAddress = {
      line1: '123 Delivery St',
      line2: 'Business Park',
      state: 'Telangana',
      district: 'Hyderabad',
      pin: '500001'
    };

    // Installation same as delivery initially
    this.copyDeliveryToInstallation();
  }

  onChallanChange(): void {
    this.showContainer = !!this.selectedChallan;
    this.notSameAddress = false; // reset checkbox on new challan
    this.copyDeliveryToInstallation();
  }

  onNotSameAddressChange(): void {
    if (!this.notSameAddress) {
      this.copyDeliveryToInstallation();
    }
  }

  private copyDeliveryToInstallation(): void {
    this.installationAddress = { ...this.deliveryAddress };
  }

  save(): void {
    console.log('PO No:', this.selectedPoNo);
    console.log('Challan:', this.selectedChallan);
    console.log('Delivery Address:', this.deliveryAddress);
    console.log('Installation Address:', this.installationAddress);
    // You can add logic to POST this data to backend here
  }
}
