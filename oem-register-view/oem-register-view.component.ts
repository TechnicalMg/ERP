import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OemRegister, OemRegisterService } from '../../services/oem-register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-oem-register-view',
  imports: [CommonModule,FormsModule],
  templateUrl: './oem-register-view.component.html',
  styleUrl: './oem-register-view.component.css'
})
export class OemRegisterViewComponent implements OnInit {

  oems: OemRegister[] = [];

  constructor(private oemService: OemRegisterService, private http: HttpClient) {}
getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaderssss",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  ngOnInit(): void {

     this.http.get<any>(`${environment.apiBaseUrl}/api/oem_register/view-all`, {
                     headers: this.getDbHeaders()
                   }).subscribe({
       
                      next: (data) => {this.oems = data;},
           error: () => alert('Error fetching user menus')
                   
           });
    // this.oemService.getAllOEMs().subscribe({
    //   next: (res) => this.oems = res,
    //   error: (err) => console.error('Error fetching OEMs:', err)
    // });

    console.log("oems",this.oems);
  }

selectedOemName: string = '';
  
@ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef;
 




filteredOems() {
    if (!this.selectedOemName) {
      return this.oems;
    }
    return this.oems.filter(o => o.name === this.selectedOemName);
   
    console.log("filteredOems:",this.filteredOems);

  }

  scrollLeft() {
    this.cardContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.cardContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }


}
