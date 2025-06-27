import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DistributorRegister, DistributorRegisterService } from '../../services/distributor-register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-distributor-register-view',
  imports: [CommonModule,FormsModule],
  templateUrl: './distributor-register-view.component.html',
  styleUrl: './distributor-register-view.component.css'
})
export class DistributorRegisterViewComponent implements OnInit {
 distributors: DistributorRegister[] = [];


  constructor(private service: DistributorRegisterService,private http:HttpClient
  ) {}
getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaderssss",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  ngOnInit(): void {
   
    
    
    this.http.get<any>(`${environment.apiBaseUrl}/api/distributor_register/view-all`, {
                 headers: this.getDbHeaders()
               }).subscribe({
   
                  next: (data) => {this.distributors = data;},
       error: () => alert('Error fetching user menus')
               
       });
  }

  selectedDistributor: string = '';

  @ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef;

  filteredDistributors() {
    if (!this.selectedDistributor) {
      return this.distributors;
    }
    return this.distributors.filter(d => d.name === this.selectedDistributor);
  }

  scrollLeft() {
    this.cardContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.cardContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
