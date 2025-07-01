import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
import { DistributorRegister, DistributorRegisterService } from '../../../services/distributor-register.service';




@Component({
  selector: 'app-distributor-expected-delivery',
  imports: [CommonModule,FormsModule],
  templateUrl: './distributor-expected-delivery.component.html',
  styleUrl: './distributor-expected-delivery.component.css'
})
export class DistributorExpectedDeliveryComponent implements OnInit{
allDetails: any[] = [];
  distributors: any[] = [];
  filteredGemPoList: any[] = [];
  filteredGemPoItems: any[] = [];
  filteredReferenceNo: any[] = [];


  selectedDistributor: string = '';
  selectedGemPo: string = '';
  selectedIssuedPo: string = '';
  selectedGemPoId: string = '';

  dateForAllItems: string | null = null;
  estimateDeliveryDate: string | null = null;
  poOtherDetails:any[]=[];
  consigneeDetails:any[]=[];
  
  // to select all checkboxes in table
  selectAllCheckbox:boolean=true;
  savedEntries: any[] = [];
  poGeneratedDate:string='';
  

  constructor(
    private poService: PurchaseOrderService,
    private fb: FormBuilder,
    private http: HttpClient,
    private service: DistributorRegisterService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }

  loadAllData() {
    this.http.get<any>(`${environment.apiBaseUrl}/api/generate-purchase-order/po-unique-distributors`, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: (data) => {
        this.allDetails = data;
        this.filterDistributors();
        console.log("All PO data:", this.allDetails);
      },
      error: () => alert('Error fetching PO data')
    });
  }

  // STEP 1: Extract distinct distributors
  filterDistributors() {
    const uniqueDistributors = new Set(this.allDetails.map(d => d.distributorName));
    this.distributors = Array.from(uniqueDistributors).map(name => ({ distributorName: name }));
    console.log("Distributors:", this.distributors);
  }

  // STEP 2: Filter GEM PO numbers by selected distributor
  onDistributorChange() {
    // this.filteredGemPoList = this.allDetails.filter(po => po.distributorName === this.selectedDistributor);
  //   this.filteredGemPoList = this.allDetails.filter(po => 
  //   po.distributorName === this.selectedDistributor &&
  //   po.inspectionStatus?.toLowerCase() !== 'all' // exclude 'All'
  // );
    const filtered = this.allDetails.filter(po => 
  po.distributorName === this.selectedDistributor &&
  po.inspectionStatus?.toLowerCase() !== 'all'
);

// Remove duplicates based on gemPoNumber
const uniqueGemPos = new Map();
filtered.forEach(po => {
  if (!uniqueGemPos.has(po.gemPoNumber)) {
    uniqueGemPos.set(po.gemPoNumber, po);
  }
});
this.filteredGemPoList = Array.from(uniqueGemPos.values());
    this.selectedGemPo = ''; // reset gem PO on distributor change
    this.filteredGemPoItems = []; // reset items list
    console.log("GEM POs for distributor", this.selectedDistributor, this.filteredGemPoList);
  }

   openCalendar(event: any) {
  if (event.target.showPicker) {
    event.target.showPicker();
  }
}
  onPoNumberChange()
  {
    console.log("calling onponumberchange");
    console.log("selected Gem Po Number:",this.selectedGemPo);
    this.filteredReferenceNo=this.allDetails.filter(po=>po.gemPoNumber===this.selectedGemPo);
    console.log(" Filetered Reference nunber s are No:",this.filteredReferenceNo);  
 
  }

  // STEP 3: When GEM PO is selected, filter its items
  
  onPoSelect(selectedGemPo: string) {
    // const matchingPO = this.allDetails.find(po => po.distributorName === this.selectedDistributor && po.gemPoNumber === selectedGemPo);
    const matchingPO = this.allDetails.find(po => po.distributorName === this.selectedDistributor && po.referenceNo === selectedGemPo);
    this.filteredGemPoItems = matchingPO?.items || [];
    this.selectedGemPoId = matchingPO?.poId || null; // Capture ID here
    console.log("Selected PO Items:", this.filteredGemPoItems);
    console.log("checking Selected PO Number:", selectedGemPo);
    if (this.selectedGemPo!=null){
this.poService.getByPoNumber(this.selectedGemPo,this.getDbHeaders()).subscribe({
      next: (res) => {this.poOtherDetails = res.data
        this.consigneeDetails=res.data.consigneeDetails;
        this.poGeneratedDate=res.data.poDate;
        console.log(" SHOWING po details",this.consigneeDetails);
        console.log("SHOWING po other details",this.poOtherDetails);
        console.log("SHOWING THE DATA FORF THE PO GENEREATED DATE",this.poGeneratedDate); 
      },
      error: (err) => {
        console.error('Error fetching details:', err);
        
      }
    });
  }
// this.filteredGemPoItems = (matchingPO?.items || []).map(item => ({
//   ...item,
//   checked: false
// }));
  }


  ngOnChanges() {
  this.toggleAllCheckboxes();
}

toggleAllCheckboxes() {
  this.filteredGemPoItems.forEach(item => item.checked = this.selectAllCheckbox);
}
  // Optional: Apply delivery date to all items
  setDateForAllItems() {
    if (!this.dateForAllItems) return;
    this.filteredGemPoItems.forEach(item => item.eddDate = this.dateForAllItems);
  }
setDateForSelectedItems() {
  if (!this.dateForAllItems) return;
  this.filteredGemPoItems
    .filter(item => item.checked)
    .forEach(item => item.eddDate = this.dateForAllItems);
}
  // Placeholder for save function
  saveData1() {
    console.log("Saving delivery details:", this.filteredGemPoItems);

  }

  balanaceEdds:number=0;
saveData() {
  if (!this.selectedGemPo || this.filteredGemPoItems.length === 0) {
    alert("Please select a GEM PO and ensure there are items to save.");
    return;
  }
 const totalItems = this.filteredGemPoItems.length;
  const itemsWithEdd = this.filteredGemPoItems.filter(item => item.eddDate).length;

  const allDatesEntered = itemsWithEdd === totalItems;
  console.log("value for all dates entered: yes or no",allDatesEntered);
  console.log(`Total items: ${totalItems}, Items with EDD: ${itemsWithEdd}`);
  this.balanaceEdds=totalItems-itemsWithEdd;

  const payload = {
    gemPoId: this.selectedGemPoId,
    gemPoNumber: this.selectedGemPo,
    distributor: this.selectedDistributor,
    balanaceEdds:this.balanaceEdds,

    items: this.filteredGemPoItems
      .filter(item => item.eddDate) // Only include if EDD is set
      .map(item => ({
        itemName: item.description,
        quantity: item.qty,
        eddDate: item.eddDate,
        itemId: item.itemId,
         expectedQty: item.qty,
      }))
  };
  this.savedEntries = this.filteredGemPoItems
  .filter(item => item.eddDate) // Only show items where EDD was set
  .map(item => ({
    itemName: item.description,
    quantity: item.qty,
    eddDate: item.eddDate
  }));
  console.log("Showing Saved entries:", this.savedEntries);

  console.log("Saving delivery details payload:", payload);

  this.http.post(`${environment.apiBaseUrl}/api/after-generate-po/save-edd`, payload, {
    headers: this.getDbHeaders()
  }).subscribe({
    next: (res) => {
      alert("Delivery details saved successfully!");
    
this.filteredGemPoItems.forEach(item => {
  item.checked = false;
  item.eddDate = '';
  item.description='';
  item.qty='';

});
this.dateForAllItems = null;
this.selectAllCheckbox = false;
  console.log("Saved Entries shown in table:", this.savedEntries);
      // Optional: Reset form or reload
    },
    error: (err) => {
      console.error("Error saving delivery:", err);
      alert("Failed to save delivery details.");
    }
  });
}


getSelectedPo() {
  return this.allDetails.find(po => po.distributorName === this.selectedDistributor && po.gemPoNumber === this.selectedGemPo);
}

validateExpectedQty(item: any): void {
  const ordered = Number(item.qty)          || 0;   // original qty
  let   entered = Number(item.expectedQty)  || 0;   // what user typed

  if (entered > ordered) {
    alert(`Expected Qty (${entered}) cannot exceed ordered Qty (${ordered}).`);
    item.expectedQty = ordered;                     // clamp back
  }
}
}