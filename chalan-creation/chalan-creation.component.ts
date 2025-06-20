import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class ChalanCreationComponent {
poNumbers = ['PO123', 'PO456'];
  selectedPoNumber: string = '';

  challanNumber = '';
  challanDate: Date | null = null;
  poNumber = '';
  poDate: Date | null = null;
  customerName = '';
  vehicleNo = '';
  courierName = '';
  courierPOD = '';
  challanDescription = '';
  billToAddress = '';
  uploadedDocs: File[] = [];
  receiverSignatureFile: File | null = null;

  itemList = [
    { description: 'Product A', hsn: '1234', qty: 10, box: 2 },
    { description: 'Product B', hsn: '5678', qty: 5, box: 1 },
    { description: 'Product C', hsn: '9012', qty: 8, box: 3 }
  ];

  onDocUpload(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedDocs.push(files[i]);
    }
  }

  onReceiverSignatureUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.receiverSignatureFile = file;
    }
  }

  getTotalBoxes(): number {
    return this.itemList.reduce((total, item) => total + item.box, 0);
  }

  getApproxValue(): number {
    // Dummy approximation logic
    return this.itemList.reduce((total, item) => total + item.qty * 100, 0);
  }

  clearForm() {
    this.challanNumber = '';
    this.challanDate = null;
    this.poNumber = '';
    this.poDate = null;
    this.customerName = '';
    this.vehicleNo = '';
    this.courierName = '';
    this.courierPOD = '';
    this.challanDescription = '';
    this.billToAddress = '';
    this.uploadedDocs = [];
    this.receiverSignatureFile = null;
  }

// getting the data from the EDD form page


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
  

  constructor(
    private poService: PurchaseOrderService ,
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
    this.filteredGemPoList = this.allDetails.filter(po => po.distributorName === this.selectedDistributor);
   
    
    this.selectedGemPo = ''; // reset gem PO on distributor change
    this.filteredGemPoItems = []; // reset items list
    console.log("GEM POs for distributor", this.selectedDistributor, this.filteredGemPoList);
  }

  // STEP 3: When GEM PO is selected, filter its items
  
  onPoSelect(selectedGemPo: string) {
    const matchingPO = this.allDetails.find(po => po.distributorName === this.selectedDistributor && po.gemPoNumber === selectedGemPo);
    this.filteredGemPoItems = matchingPO?.items || [];
    this.selectedGemPoId = matchingPO?.poId || null; // Capture ID here
    console.log("Selected PO Items:", this.filteredGemPoItems);
    console.log("checking Selected PO Number:", selectedGemPo);
    if (this.selectedGemPo!=null){
this.poService.getByPoNumber(this.selectedGemPo,this.getDbHeaders()).subscribe({
      next: (res) => {this.poOtherDetails = res.data
        this.consigneeDetails=res.data.consigneeDetails;
        console.log(" SHOWING po details",this.consigneeDetails);
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

saveData() {
  if (!this.selectedGemPo || this.filteredGemPoItems.length === 0) {
    alert("Please select a GEM PO and ensure there are items to save.");
    return;
  }

  const payload = {
    gemPoId: this.selectedGemPoId,
    gemPoNumber: this.selectedGemPo,
    distributor: this.selectedDistributor,
    items: this.filteredGemPoItems
      .filter(item => item.eddDate) // Only include if EDD is set
      .map(item => ({
        itemName: item.description,
        quantity: item.qty,
        eddDate: item.eddDate,
        itemId: item.itemId
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

  //     this.savedEntries = payload.items.map(item => ({
  //   itemName: item.itemName,
  //   quantity: item.quantity,
  //   eddDate: item.eddDate
  // }));
this.filteredGemPoItems.forEach(item => {
  item.checked = false;
  item.eddDate = '';
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



}
