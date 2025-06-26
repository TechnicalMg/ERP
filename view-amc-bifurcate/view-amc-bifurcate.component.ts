import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-amc-bifurcate',
  imports: [CommonModule,FormsModule],
  templateUrl: './view-amc-bifurcate.component.html',
  styleUrl: './view-amc-bifurcate.component.css'
})
export class ViewAmcBifurcateComponent implements OnInit {
gemPoList: string[] = ['GEMC-511687747384414', 'GEM/2024/B/654321'];
  selectedGemPo: string = this.gemPoList[0];
  amcDetails: any[] = [];

  constructor(private http: HttpClient) {}
getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaders",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  ngOnInit(): void {
      this.fetchGemPo();
      // this.fetchAmcData();
  }

  fetchGemPo() {
    this.http.get<string[]>(`${environment.apiBaseUrl}/api/amc-bifurcation/gem-po-list`,{headers:this.getDbHeaders()}).subscribe((data) => {
      console.log("data",data);
      this.gemPoList = data;
    });
  }
  fetchAmcData() {
    this.http.get<any>(`${environment.apiBaseUrl}/api/amc-bifurcation/get-by-gem?gemPoNumber=${this.selectedGemPo}`,{headers:this.getDbHeaders()})
      .subscribe({
        next: (res) => {
          this.amcDetails = res.details;
          console.log(this.amcDetails);
        },
        error: (err) => {
          console.error('Error fetching AMC:', err);
          alert('AMC not found for selected GEM PO');
        }
      });
  }
}
