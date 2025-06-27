import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
interface StateDistrict  {
  state: string;
  districts: string[];
  Corporatestate: string;
  Corporatedistricts:string[];
 
}
@Component({
  selector: 'app-oem-registration',
  imports: [FormsModule,CommonModule],
  templateUrl: './oem-registration.component.html',
  styleUrl: './oem-registration.component.css'
})
export class OemRegistrationComponent implements OnInit {
// export class OemRegistrationComponent {
// distributorForm = {
//     name: '',
//     gstin: '',
//     pan: '',
//     email: '',
//     contactPerson: '',
//     address: '',
//     designation: '',
//     contactNumber: ''
//   };

   distributorForm = {
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
    contacts: [
      { name: '', designation: '',email:'', number: '' }
    ]
  };
states: string[] = [];
districts: string[] = [];
  // states: string[] = ['Bihar', 'UP', 'Delhi']; // replace with actual list
  // districts: string[] = ['Patna', 'Noida', 'New Delhi']; // dynamic if needed
  // selectedState = '';
  selectedDistrict = '';

  registeredDistributors: any[] = [];
  corcorporateOfficeState:any[]=[];
  corporateofficeDistrict:any[]=[];
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

getLocationData(): Observable<StateDistrict[]> {
  // console.log(this.http.get('/location-data.json'));
  return this.http.get<StateDistrict[]>('assets/location-data.json');

}
  constructor(private http: HttpClient)
  {

  }

addContactPerson() {
    this.distributorForm.contacts.push({ name: '', designation: '',email:'', number: '' });
  }
  
onStateChange() {
    const selected = this.locationData.find(item => item.state === this.selectedState);
    this.districts = selected ? selected.districts : [];
    this.selectedDistrict = '';
    this.distributorForm.state = this.selectedState;
  }
removeContact(index: number) {
    this.distributorForm.contacts.splice(index, 1);
  }


  // submitForm() {
  //   const newEntry = {
  //     ...this.distributorForm,
  //     sno: this.registeredDistributors.length + 1
  //   };
  //   this.registeredDistributors.push(newEntry);
  //   this.resetForm();
  // }

  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaderssss",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  submitForm() {
    console.log("distributionForm details",this.distributorForm);
  

this.http.post<any>(`${environment.apiBaseUrl}`+'/api/oem_register/register', this.distributorForm, {
              headers: this.getDbHeaders()
            }).subscribe({
    next: (response) => {
      console.log('Saved Successfully:', response);
      alert('OEM saved successfully');
    },
    error: (error) => {
      console.error('Save Error:', error);
      alert('Error occurred while saving OEM');
    }
  });

  // this.http.post(`${environment.apiBaseUrl}`+'/api/oem_register/register', this.distributorForm).subscribe({
  //   // `${this.apiUrl}/by-po-number/
  //   next: res => {
  //     alert("OEM Registered Successfully!");
  //     this.registeredDistributors.push(res);
  //     this.resetForm();
  //   },
  //   error: err => {
  //     alert("Error saving OEM");
  //     console.error(err);
  //   }
  // });
}
  resetForm() {
    this.distributorForm = {
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
      contacts: [
        { name: '', designation: '',email:'', number: '' }
      ]
    };
  }



   // Validation flags
  phoneError = false;
  emailError = false;
  panError = false;
  gstinError = false;
  validatePhone() {
    const phonePattern = /^[0-9]{10}$/;
    this.phoneError = !phonePattern.test(this.distributorForm.phone);
  }

  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailPattern.test(this.distributorForm.email);
  }

  validatePAN() {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    this.panError = !panPattern.test(this.distributorForm.pan);
  }

  validateGSTIN() {
    const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    this.gstinError = !gstinPattern.test(this.distributorForm.gstin);
  }
  showInput=false;
}
