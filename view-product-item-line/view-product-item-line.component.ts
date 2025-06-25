import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { AutoResizeInputDirective } from '../../directives/auto-resize.directive';

@Component({
  selector: 'app-view-product-item-line',
  imports: [FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
  CommonModule,
],
  templateUrl: './view-product-item-line.component.html',
  styleUrl: './view-product-item-line.component.css'
})
export class ViewProductItemLineComponent implements OnInit{

  displayedColumns: string[] = [
  'gemNumber',
  'distributor',
  'productName',
  'brand',
  'model',
  'quantity',
  'unitPrice'
];
  gemNumber: string = '';
  selectedDistributor: string = '';
  distributors: string[] = [];
  purchaseOrders: any[] = [];

  constructor(private http: HttpClient) {}

  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaders",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  ngOnInit(): void {
    this.fetchDistributors();
    this.fetchAll();
  }

  fetchDistributors() {
    this.http.get<string[]>(`${environment.apiBaseUrl}`+'/api/product-bifurcation/distributors',{headers:this.getDbHeaders()}).subscribe(data => {
      this.distributors = data;
    });
    console.log("distributors fetch Distribuitor",this.distributors);
  }

  fetchAll() {
    this.http.get<any[]>(`${environment.apiBaseUrl}`+'/api/product-bifurcation/all',{headers:this.getDbHeaders()}).subscribe(data => {
      this.purchaseOrders = data;
    });

    console.log("purchase orders fetch All",this.purchaseOrders);
  }

  filterByGemNumber() {
    if (this.gemNumber) {
      const params = new HttpParams().set('gemNumber', this.gemNumber);
      this.http.get<any[]>(`${environment.apiBaseUrl}`+'/api/product-bifurcation/by-gem', { params,headers:this.getDbHeaders() }).subscribe(data => {
        this.purchaseOrders = data;
      });
    }
    console.log("purchase orders filter By Gem Number",this.purchaseOrders);
  }

  filterByDistributor() {
    if (this.selectedDistributor) {
      const params = new HttpParams().set('distributor', this.selectedDistributor);
      this.http.get<any[]>(`${environment.apiBaseUrl}`+'/api/product-bifurcation/by-distributor', { params,headers:this.getDbHeaders() }).subscribe(data => {
        this.purchaseOrders = data;
      });
    }
  }

  resetFilters() {
    this.gemNumber = '';
    this.selectedDistributor = '';
    this.fetchAll();
  }
}
