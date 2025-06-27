import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DistributorRegister, DistributorRegisterService } from '../../services/distributor-register.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
interface StateDistrict  {
  state: string;
  districts: string[];
  Corporatestate: string;
  Corporatedistricts:string[];
 
}
@Component({
  selector: 'app-distributor-registration',
  imports: [FormsModule,CommonModule],
  templateUrl: './distributor-registration.component.html',
  styleUrl: './distributor-registration.component.css'
})
export class DistributorRegistrationComponent implements OnInit {
  

  registeredDistributors: any[] = [];
  states: string[] = [];
districts: string[] = [];
 selectedDistrict = '';
 selectedState:string='';
  locationData: StateDistrict[] = [];
ngOnInit(): void {
  
   this.getLocationData().subscribe(data => {
    
    this.locationData=data;


    this.states = data.map(item => item.state); // This will extract an array of state names
    // this.Corporatestates = data.map(item => item.state); // This will extract an array of state names
    console.log("Extracted states:", this.states);
  });

  }

  // Validation flags
  phoneError = false;
  emailError = false;
  panError = false;
  gstinError = false;
  validatePhone() {
    const phonePattern = /^[0-9]{10}$/;
    this.phoneError = !phonePattern.test(this.distributor.phone);
  }

  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(this.distributor.email);
  }

  validatePAN() {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    this.panError = !panPattern.test(this.distributor.pan);
  }

  validateGSTIN() {
    const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    this.gstinError = !gstinPattern.test(this.distributor.gstin);
  }

distributor: DistributorRegister = {
    name: '',
    address1: '',
    address2: '',
    address3: '',
    phone: '',
    state: '',
    district: '',
    pincode: '',
    email: '',
    pan: '',
    gstin: '',
    contacts: [{ name: '', designation: '',email:'', number: '' }]
  };

  constructor(private service: DistributorRegisterService,private http: HttpClient) {}

  addContact() {
    this.distributor.contacts.push({ name: '', designation: '',email:'', number: '' });
  }

  removeContact(index: number) {
    this.distributor.contacts.splice(index, 1);
  }


getLocationData(): Observable<StateDistrict[]> {
  return this.http.get<StateDistrict[]>('assets/location-data.json');

}  
getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaders",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }

save() {
//  this.http.get<any>(`${environment.apiBaseUrl}/api/distributor_register/view-all`, {
//               headers: this.getDbHeaders()
//             }).subscribe({

//                next: (data) => {this.distributors = data;},
//     error: () => alert('Error fetching user menus')
            
//     });
    this.http.post<any>(`${environment.apiBaseUrl}`+'/api/distributor_register/save', this.distributor, {
              headers: this.getDbHeaders()
            }).subscribe({
    next: (response) => {
      console.log('Saved Successfully:', response);
      alert('Distributor saved successfully');
    },
    error: (error) => {
      console.error('Save Error:', error);
      alert('Error occurred while saving distributor');
    }
  });

  }

  onStateChange() {
    const selected = this.locationData.find(item => item.state === this.selectedState);
    this.districts = selected ? selected.districts : [];
    this.selectedDistrict = '';
    this.distributor.state = this.selectedState;
  }

  removeRow(){
    
  }

}
