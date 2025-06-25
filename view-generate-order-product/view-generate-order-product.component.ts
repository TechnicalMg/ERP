import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-generate-order-product',
  imports: [CommonModule],
  templateUrl: './view-generate-order-product.component.html',
  styleUrl: './view-generate-order-product.component.css'
})
export class ViewGenerateOrderProductComponent implements OnInit{

  poOrders: any[] = [];

  constructor(private http: HttpClient) {}
getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaders",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/generate-purchase-order/view-all`,{ headers: this.getDbHeaders()}).subscribe({
      next: data => this.poOrders = data,
      error: err => console.error('Error loading orders:', err)
    });
    console.log("loading view po orders",this.poOrders);
  }
  
  printPo(poId: number) {
    console.log("this is po orderss",this.poOrders);
  const headers = this.getDbHeaders();
  this.http.get(`${environment.apiBaseUrl}/api/generate-purchase-order/print/${poId}`, {
    headers,
    responseType: 'blob' // Because it's a PDF file
  }).subscribe(blob => {
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL); // or use download
  }, error => {
    console.error('Print error', error);
  });
}
}
