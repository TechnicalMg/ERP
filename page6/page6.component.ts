import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
// import { environment } from '../../../../environments/environment';
// import { PurchaseOrderService } from '../../../services/purchase-order.service';
// import { DistributorRegister, DistributorRegisterService } from '../../../services/distributor-register.service';




@Component({
  selector: 'app-distributor-expected-delivery',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './page6.component.html',
  styleUrl: './page6.component.css'
})
export class Page6Component implements OnInit{
allDetails: any[] = [];
  distributors: any[] = [];
  filteredGemPoList: any[] = [];
  filteredGemPoItems: any[] = [];

  selectedDistributor: string = '';
  selectedGemPo: string = '';
  selectedGemPoId: string = '';

  dateForAllItems: string | null = null;
  estimateDeliveryDate: string | null = null;
  poOtherDetails:any[]=[];
  consigneeDetails:any[]=[];
  
  // to select all checkboxes in table
  selectAllCheckbox:boolean=true;
  savedEntries: any[] = [];
referenceNo: any;
poGeneratedDate: any;
deliveryStartDate: any;
deliveryEndDate: any;
yourDateField: any;
  

  constructor(
    // q
    private fb: FormBuilder,
    private http: HttpClient,
    // private service: DistributorRegisterService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ngOnInit(): void {
  //   this.loadAllData();
  // }

  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }

  openCalendar(event: any) {
  if (event.target.showPicker) {
    event.target.showPicker();
  }
}

  // loadAllData() {
  //   this.http.get<any>(`${environment.apiBaseUrl}/api/generate-purchase-order/po-unique-distributors`, {
  //     headers: this.getDbHeaders()
  //   }).subscribe({
  //     next: (data) => {
  //       this.allDetails = data;
  //       this.filterDistributors();
  //       console.log("All PO data:", this.allDetails);
  //     },
  //     error: () => alert('Error fetching PO data')
  //   });
  // }

  // STEP 1: Extract distinct distributors
  // filterDistributors() {
  //   const uniqueDistributors = new Set(this.allDetails.map(d => d.distributorName));
  //   this.distributors = Array.from(uniqueDistributors).map(name => ({ distributorName: name }));
  //   console.log("Distributors:", this.distributors);
  // }

  // STEP 2: Filter GEM PO numbers by selected distributor
  // onDistributorChange() {
  //   // this.filteredGemPoList = this.allDetails.filter(po => po.distributorName === this.selectedDistributor);
  //   this.filteredGemPoList = this.allDetails.filter(po => 
  //   po.distributorName === this.selectedDistributor &&
  //   po.inspectionStatus?.toLowerCase() !== 'all' // exclude 'All'
  // );
    
  //   this.selectedGemPo = ''; // reset gem PO on distributor change
  //   this.filteredGemPoItems = []; // reset items list
  //   console.log("GEM POs for distributor", this.selectedDistributor, this.filteredGemPoList);
  // }

  // STEP 3: When GEM PO is selected, filter its items
  
//   onPoSelect(selectedGemPo: string) {
//     const matchingPO = this.allDetails.find(po => po.distributorName === this.selectedDistributor && po.gemPoNumber === selectedGemPo);
//     this.filteredGemPoItems = matchingPO?.items || [];
//     this.selectedGemPoId = matchingPO?.poId || null; // Capture ID here
//     console.log("Selected PO Items:", this.filteredGemPoItems);
//     console.log("checking Selected PO Number:", selectedGemPo);
//     if (this.selectedGemPo!=null){
// this.poService.getByPoNumber(this.selectedGemPo,this.getDbHeaders()).subscribe({
//       next: (res) => {this.poOtherDetails = res.data
//         this.consigneeDetails=res.data.consigneeDetails;
//         console.log(" SHOWING po details",this.consigneeDetails);
//       },
//       error: (err) => {
//         console.error('Error fetching details:', err);
        
//       }
//     });
//   }
// // this.filteredGemPoItems = (matchingPO?.items || []).map(item => ({
// //   ...item,
// //   checked: false
// // }));
//   }


//   ngOnChanges() {
//   this.toggleAllCheckboxes();
// }

// toggleAllCheckboxes() {
//   this.filteredGemPoItems.forEach(item => item.checked = this.selectAllCheckbox);
// }
//   // Optional: Apply delivery date to all items
//   setDateForAllItems() {
//     if (!this.dateForAllItems) return;
//     this.filteredGemPoItems.forEach(item => item.eddDate = this.dateForAllItems);
//   }
// setDateForSelectedItems() {
//   if (!this.dateForAllItems) return;
//   this.filteredGemPoItems
//     .filter(item => item.checked)
//     .forEach(item => item.eddDate = this.dateForAllItems);
// }
//   // Placeholder for save function
//   saveData1() {
//     console.log("Saving delivery details:", this.filteredGemPoItems);

//   }

// saveData() {
//   if (!this.selectedGemPo || this.filteredGemPoItems.length === 0) {
//     alert("Please select a GEM PO and ensure there are items to save.");
//     return;
//   }
//  const totalItems = this.filteredGemPoItems.length;
//   const itemsWithEdd = this.filteredGemPoItems.filter(item => item.eddDate).length;

//   const allDatesEntered = itemsWithEdd === totalItems;
//   console.log("value for all dates entered: yes or no",allDatesEntered);
//   console.log(`Total items: ${totalItems}, Items with EDD: ${itemsWithEdd}`);
//   const payload = {
//     gemPoId: this.selectedGemPoId,
//     gemPoNumber: this.selectedGemPo,
//     distributor: this.selectedDistributor,
//     items: this.filteredGemPoItems
//       .filter(item => item.eddDate) // Only include if EDD is set
//       .map(item => ({
//         itemName: item.description,
//         quantity: item.qty,
//         eddDate: item.eddDate,
//         itemId: item.itemId
//       }))
//   };
//   this.savedEntries = this.filteredGemPoItems
//   .filter(item => item.eddDate) // Only show items where EDD was set
//   .map(item => ({
//     itemName: item.description,
//     quantity: item.qty,
//     eddDate: item.eddDate
//   }));
//   console.log("Showing Saved entries:", this.savedEntries);

//   console.log("Saving delivery details payload:", payload);

//   this.http.post(`${environment.apiBaseUrl}/api/after-generate-po/save-edd`, payload, {
//     headers: this.getDbHeaders()
//   }).subscribe({
//     next: (res) => {
//       alert("Delivery details saved successfully!");
    
// this.filteredGemPoItems.forEach(item => {
//   item.checked = false;
//   item.eddDate = '';
// });
// this.dateForAllItems = null;
// this.selectAllCheckbox = false;
//   console.log("Saved Entries shown in table:", this.savedEntries);
//       // Optional: Reset form or reload
//     },
//     error: (err) => {
//       console.error("Error saving delivery:", err);
//       alert("Failed to save delivery details.");
//     }
//   });
// }


// getSelectedPo() {
//   return this.allDetails.find(po => po.distributorName === this.selectedDistributor && po.gemPoNumber === this.selectedGemPo);
}
