import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DistributorRegisterService } from '../../../services/distributor-register.service';
import { environment } from '../../../../environments/environment';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

interface StateDistrict  {
  state: string;
  districts: string[];
  Corporatestate: string;
  Corporatedistricts:string[];
 
}
@Component({
  selector: 'app-chalan-creation',
  imports: [CommonModule,FormsModule , MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule ],
  templateUrl: './chalan-creation.component.html',
  styleUrl: './chalan-creation.component.css'
})
export class ChalanCreationComponent implements OnInit {

  distributors: string[] = [];
  receivedPoList: string[] = [];
  issuedPoList: string[] = [];
  items: any[] = [];

  selectedDistributor = '';
  selectedReceivedPoId = '';
  selectedIssuedPoId = '';

  challanNo = '';
  challanDate = new Date().toISOString().split('T')[0];
  todayStr = this.challanDate;

  deliveryType = 'By-Hand';
  shipTo = 'same';
  shipToAddress = '';
  courierName = '';
  courierPOD = '';
  vehicleNo = '';

  address1:string='';
  address2:string='';
  address3:string='';
  district:string='';
  selectedState:string='';
  pincode:string='';
  


   states: string[] = [];
districts: string[] = [];
 selectedDistrict = '';
 
  locationData: StateDistrict[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDistributors();
    this.getNextChallanNo();
    this.getLocationData().subscribe(data => {
    
    this.locationData=data;


    this.states = data.map(item => item.state); // This will extract an array of state names
    // this.Corporatestates = data.map(item => item.state); // This will extract an array of state names
    console.log("Extracted states:", this.states);
  });
  }

  getLocationData(): Observable<StateDistrict[]> {
    return this.http.get<StateDistrict[]>('assets/location-data.json');
  
  } 
  getDbHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-DB-Name': sessionStorage.getItem('dbName') || ''
    });
  }

  fetchDistributors() {
    this.http.get<string[]>(`${environment.apiBaseUrl}/api/delivery-challan/distributors`, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: res => this.distributors = res,
      error: () => alert('Failed to load distributors')
    });
  }

  onDistributorChange() {
    this.receivedPoList = [];
    this.issuedPoList = [];

    this.http.get<any[]>(`${environment.apiBaseUrl}/api/delivery-challan/po/by-distributor/${this.selectedDistributor}`, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: res => {
        this.receivedPoList = res.filter(r => r.type === 'RECEIVED').map(r => r.poNumber);
        this.issuedPoList = res.filter(r => r.type === 'ISSUED').map(r => r.poNumber);
      },
      error: () => alert('Failed to load POs')
    });
  }

  onReceivedPoChange() {
    if (!this.selectedReceivedPoId) return;

    // this.http.get<any[]>(`${environment.apiBaseUrl}/api/delivery-challan/po/${this.selectedReceivedPoId}/items`, {
     this.http.get<any[]>(`${environment.apiBaseUrl}/api/delivery-challan/po/${this.selectedReceivedPoId}/serial-hsn`, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: res => {this.items = res
        console.log("ressssss",res);
      },
      error: () => alert('Failed to load items')
    });
    
    console.log("items s s s s ",this.items);
  }

   onStateChange() {
    const selected = this.locationData.find(item => item.state === this.selectedState);
    this.districts = selected ? selected.districts : [];
    // this.selectedDistrict = '';
    // this.states = this.selectedState;
  }
  getNextChallanNo() {

    console.log("Calling: chalan", `${environment.apiBaseUrl}/api/challan/next-number`);
    console.log("Calling: delivery chalan", `${environment.apiBaseUrl}/api/delivery-challan/next-number`);

    // this.http.get<string>(`${environment.apiBaseUrl}/api/delivery-challan/next-number`, {
    this.http.get(`${environment.apiBaseUrl}/api/delivery-challan/next-number`, {
      headers: this.getDbHeaders(),
       responseType: 'text'
    }).subscribe({
      next: res =>{ this.challanNo = res},
      error: () => alert('Failed to fetch Challan No')
    });
  }

  onDeliveryTypeChange() {
    this.courierName = '';
    this.courierPOD = '';
    this.vehicleNo = '';
  }


fetchItems(poId: string) {
  console.log("Calling this fetchItems fucntions", poId);
  // this.http.get<any[]>(`${environment.apiBaseUrl}/api/delivery-challan/po/${poId}/items`, {
  this.http.get<any[]>(`${environment.apiBaseUrl}/api/delivery-challan/po/${poId}/serial-hsn`, {
    headers: this.getDbHeaders()
  }).subscribe(res => {
    this.items = res.map(item => ({
      ...item,
      type: 'Meter',
      qtyToBeSupplied: 0 // default
    }));
  });
  console.log("items------->>>>>>>>>>.",this.items);
}

saveChallan() {
  const payload = {
    challanNo: this.challanNo,
    challanDate: this.challanDate,
    receivedPo: this.selectedReceivedPoId,
  issuedPo: this.selectedIssuedPoId,
    deliveryType: this.deliveryType,
    shipTo: this.shipTo === 'custom' ? this.shipToAddress : 'Same as Consignee Address',
    courierName: this.courierName,
    courierPOD: this.courierPOD,
    vehicleNo: this.vehicleNo,
    address1:this.address1,
    address2:this.address2,
    address3:this.address3,
    state:this.selectedState,
    district:this.district,
    pincode:this.pincode,
    items: this.items.map(item => ({
      partNo: item.partNo,
      serialNo: item.serialNo,
      description: item.itemDescription,
      qtyOrdered: item.qtyOrdered,
      qtySupplied: item.qtyFromStock,
      qtyToBeSupplied: item.qtyToBeSupplied,
      type: item.type,
      box: 0 // Optional, defaulting
    }))
  };

  console.log("payload on save",payload);

//  this.http.post(`${environment.apiBaseUrl}/api/delivery-challan/save`, payload, {
//     headers: this.getDbHeaders(),
//     responseType: 'blob'
//   }).subscribe(blob => {
//     const pdfBlob = new Blob([blob], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(pdfBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'DeliveryChallan.pdf';
//     link.click();
//   }, error => {
//     console.error("Challan print failed", error);
//   });



    this.http.post<number>(`${environment.apiBaseUrl}/api/delivery-challan/save`, payload, {
      headers: this.getDbHeaders()
  }).subscribe({
      next: (id: number) => {
        alert(`Challan Saved `);
          console.log('Saved challan id =', id);
          this.downloadPdf(id);                          // call print separately
      },
      error: err => console.error('Save failed', err)
  });
}

private downloadPdf(id: number): void {
  this.http.get(`${environment.apiBaseUrl}/api/delivery-challan/${id}/print`, {
      headers: this.getDbHeaders(),
      responseType: 'blob'
  }).subscribe({
      next: blob => {
          const url  = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
          const link = document.createElement('a');
          link.href  = url;
          link.download = `DeliveryChallan_${id}.pdf`;
          link.click();
      },
      error: err => console.error('Print failed', err)
  });


  
  
}

}
