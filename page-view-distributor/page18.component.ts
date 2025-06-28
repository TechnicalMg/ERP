import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-page18',
  imports: [HeaderComponent,SidebarComponent,FormsModule,CommonModule],
  templateUrl: './page18.component.html',
  styleUrl: './page18.component.css',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})

export class Page18Component {

  selectedDistributorCard: any = null;
distributorNames: string[] = ['ABC Distributors', 'XYZ Enterprises', 'JKL Distributors'];

distributors = [
  {
    name: 'ABC Distributors',
    phone: '9876543210',
    email: 'abc@example.com',
    address1: '123 Main Street',
    address2: 'Near Tech Park',
    address3: 'Floor 2',
    state: 'Maharashtra',
    district: 'Pune',
    pan: 'ABCDE1234F',
    gstin: '27ABCDE1234F1Z5',
    contacts: [
      { name: 'John Doe', designation: 'Manager', email: 'john@example.com', number: '9876543210' },
      { name: 'Jane Smith', designation: 'Coordinator', email: 'jane@example.com', number: '9876500000' }
    ]
  },
  // Add XYZ and JKL similarly
  {
    name: 'XYZ Distributors',
    phone: '9558528164',
    email: 'xyz@example.com',
    address1: '321 Main Street',
    address2: 'Near Tech Park',
    address3: 'Floor 2',
    state: 'Maharashtra',
    district: 'Pune',
    pan: 'ABCDE1234F',
    gstin: '27ABCDE1234F1Z5',
    contacts: [
      { name: 'John Doe', designation: 'Manager', email: 'john@example.com', number: '9156189531' },
      { name: 'Jane Smith', designation: 'Coordinator', email: 'jane@example.com', number: '9876500000' }
    ]
  },

  {
    name: 'JKL Distributors',
    phone: '9841545518',
    email: 'abc@example.com',
    address1: '123 Main Street',
    address2: 'Near Tech Park',
    address3: 'Floor 2',
    state: 'Maharashtra',
    district: 'Pune',
    pan: 'ABCDE1234F',
    gstin: '27ABCDE1234F1Z5',
    contacts: [
      { name: 'John Doe', designation: 'Manager', email: 'john@example.com', number: '1546548165' },
      { name: 'Jane Smith', designation: 'Coordinator', email: 'jane@example.com', number: '9876500000' }
    ]
  },
];

selectDistributor(distributor: any) {
  this.selectedDistributorCard = distributor;
}
}