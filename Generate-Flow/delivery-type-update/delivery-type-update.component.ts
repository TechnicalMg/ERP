import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-type-update',
  imports: [CommonModule,FormsModule],
  templateUrl: './delivery-type-update.component.html',
  styleUrl: './delivery-type-update.component.css'
})
export class DeliveryTypeUpdateComponent implements OnInit {

  receivedPoList: any[] = [];
  chalanList: any[] = [];

  selectedPoId: any = '';
  selectedChallanId: any = '';
  selectedDeliveryType = '';

  courierPodNumber = '';
  courierPodPdf: File | null = null;

  vehicleNumber = '';
  vehicleType = '';
  ewayBillPdf: File | null = null;
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReceivedPOs();
  }

  getDbHeaders(): HttpHeaders {
    return new HttpHeaders({ 'X-DB-Name': sessionStorage.getItem('dbName') || '' });
  }

  fetchReceivedPOs() {
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/po/received`, {
      headers: this.getDbHeaders()
    }).subscribe(data => this.receivedPoList = data);
  }

  onPoChange() {
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/challan/by-po/${this.selectedPoId}`, {
      headers: this.getDbHeaders()
    }).subscribe(data => this.chalanList = data);
  }

  onDeliveryTypeChange() {
    this.resetDeliveryFields();
  }

  resetDeliveryFields() {
    this.courierPodNumber = '';
    this.courierPodPdf = null;
    this.vehicleNumber = '';
    this.vehicleType = '';
    this.ewayBillPdf = null;
  }

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'pod') this.courierPodPdf = file;
    if (type === 'eway') this.ewayBillPdf = file;
  }

  submitDeliveryDetails() {
    const formData = new FormData();
    formData.append('poId', this.selectedPoId);
    formData.append('challanId', this.selectedChallanId);
    formData.append('deliveryType', this.selectedDeliveryType);

    if (this.selectedDeliveryType === 'By-Courier') {
      formData.append('podNumber', this.courierPodNumber);
      if (this.courierPodPdf) formData.append('podPdf', this.courierPodPdf);
    }

    if (this.selectedDeliveryType === 'By-Transport') {
      formData.append('vehicleNumber', this.vehicleNumber);
      formData.append('vehicleType', this.vehicleType);
      if (this.ewayBillPdf) formData.append('ewayBill', this.ewayBillPdf);
    }

    this.http.post(`${environment.apiBaseUrl}/api/delivery-type/update`, formData, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: () => alert('Delivery details updated!'),
      error: () => alert('Error saving delivery details')
    });
  }
}