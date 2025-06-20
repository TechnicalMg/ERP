import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DistributorRegisterService } from '../../../services/distributor-register.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-vendor-delivery-invoice-bill',
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor-delivery-invoice-bill.component.html',
  styleUrl: './vendor-delivery-invoice-bill.component.css'
})
export class VendorDeliveryInvoiceBillComponent implements OnInit {


  selectedPoNumber: string = '';
  documentType: string = '';

  invoiceFile: File | null = null;
  billFile: File | null = null;



  //new code from here
  allDetails: any[] = [];
  distributors: any[] = [];
  filteredGemPoList: any[] = [];
  filteredGemPoItems: any[] = [];
filteredReferenceNo: any[] = [];
  selectedDistributor: string = '';
  selectedGemPo: string = '';
  selectedGemPoId: string = '';

  dateForAllItems: string | null = null;
  estimateDeliveryDate: string | null = null;
  poOtherDetails:any[]=[];
  consigneeDetails:any[]=[];
 poGeneratedDate:string='';
  
  // to select all checkboxes in table
  selectAllCheckbox:boolean=true;
  savedEntries: any[] = [];
  selectedIssuedPo: string = '';
  

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
    this.filteredGemPoList = this.allDetails.filter(po => 
    po.distributorName === this.selectedDistributor &&
    po.inspectionStatus?.toLowerCase() !== 'all' // exclude 'All'
  );
    
    this.selectedGemPo = ''; // reset gem PO on distributor change
    this.filteredGemPoItems = []; // reset items list
    console.log("GEM POs for distributor", this.selectedDistributor, this.filteredGemPoList);
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
      },
      error: (err) => {
        console.error('Error fetching details:', err);
        
      }
    });
  }

  }

  // Optional: Apply delivery date to all items
 ngOnChanges() {
  this.toggleAllCheckboxes();
}

toggleAllCheckboxes() {
  this.filteredGemPoItems.forEach(item => item.checked = this.selectAllCheckbox);
}
  // Optional: Apply delivery date to all items
  setDateForAllItems() {
    if (!this.dateForAllItems) return;
    this.filteredGemPoItems.forEach(item => item.addDate = this.dateForAllItems);
  }
setDateForSelectedItems() {
  if (!this.dateForAllItems) return;
  this.filteredGemPoItems
    .filter(item => item.checked)
    .forEach(item => item.addDate = this.dateForAllItems);
}

  // Placeholder for save function
  




saveData1() {
  if (!this.selectedGemPo || this.filteredGemPoItems.length === 0) {
    alert("Please select a GEM PO and ensure there are items to save.");
    return;
  }

  const formData = new FormData();

  // Append metadata as JSON string
  const payload = {
    gemPoId: this.selectedGemPoId,
    gemPoNumber: this.selectedGemPo,
    distributor: this.selectedDistributor,
    documentType: this.documentType,
    items: this.filteredGemPoItems
      .filter(item => item.eddDate) // Include only if EDD is set
      .map(item => ({
        itemName: item.description,
        quantity: item.qty,
        addDate: item.addDate,
        itemId: item.itemId
      }))
  };

   this.savedEntries = this.filteredGemPoItems
  .filter(item => item.eddDate) // Only show items where EDD was set
  .map(item => ({
    itemName: item.description,
    quantity: item.qty,
    addDate: item.addDate
  }));
  console.log("Showing Saved entries:", this.savedEntries);



  formData.append("data", new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  // Optional PDF files
  if (this.invoiceFile) {
    formData.append("invoiceFile", this.invoiceFile);
  }
  if (this.billFile) {
    formData.append("billFile", this.billFile);
  }

  this.http.post(`${environment.apiBaseUrl}/api/after-generate-po/save-add`, formData, {
    headers: this.getDbHeaders()
  }).subscribe({
    next: (res) => {
      alert("ADD & files saved successfully!");
    },
    error: (err) => {
      console.error("Error saving delivery:", err);
      alert("Failed to save ADD or upload files.");
    }
  });
}

saveData() {
  if (!this.selectedGemPo || this.filteredGemPoItems.length === 0) {
    alert("Please select a GEM PO and ensure there are items to save.");
    return;
  }

  const jsonPayload = {
    gemPoId: this.selectedGemPoId,
    gemPoNumber: this.selectedGemPo,
    distributor: this.selectedDistributor,
    items: this.filteredGemPoItems
      .filter(item => item.addDate) // Only include if ADD is set
      .map(item => ({
        itemName: item.description,
        quantity: item.qty,
        addDate: item.addDate,
        itemId: item.itemId
      }))
  };
 this.savedEntries = this.filteredGemPoItems
  .filter(item => item.eddDate) // Only show items where EDD was set
  .map(item => ({
    itemName: item.description,
    quantity: item.qty,
    addDate: item.addDate
  }));
  console.log("Showing Saved entries:", this.savedEntries);

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify(jsonPayload)], { type: "application/json" }));

  if (this.invoiceFile) {
    formData.append("invoiceFile", this.invoiceFile, this.invoiceFile.name);
  }

  if (this.billFile) {
    formData.append("billFile", this.billFile, this.billFile.name);
  }

  this.http.post(`${environment.apiBaseUrl}/api/after-generate-po/save-add`, formData, {
    headers: this.getDbHeaders()
  }).subscribe({
    next: () => {
      alert("ADD data and PDFs uploaded successfully.");
    },
    error: (err) => {
      console.error("Upload failed:", err);
      alert("Failed to upload ADD and PDFs.");
    }
  });
}
getSelectedPo() {
  return this.allDetails.find(po => po.distributorName === this.selectedDistributor && po.gemPoNumber === this.selectedGemPo);
}








  // previous codes now to update pdf and save dummy 
  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'invoice') {
      this.invoiceFile = file;
    } else if (fileType === 'bill') {
      this.billFile = file;
    }
  }

  submitForm() {
    if (!this.selectedDistributor || !this.selectedPoNumber || !this.documentType) {
      alert('Please complete all selections.');
      return;
    }

    if (this.documentType === 'Invoice' && !this.invoiceFile) {
      alert('Please upload invoice PDF.');
      return;
    }

    if (this.documentType === 'Bill' && !this.billFile) {
      alert('Please upload bill PDF.');
      return;
    }

    if (this.documentType === 'Bill+Invoice' && (!this.billFile || !this.invoiceFile)) {
      alert('Please upload both bill and invoice PDFs.');
      return;
    }

    console.log('Submitted:', {
      distributor: this.selectedDistributor,
      poNumber: this.selectedPoNumber,
      documentType: this.documentType,
      invoiceFileName: this.invoiceFile?.name,
      billFileName: this.billFile?.name
    });

    alert('Documents submitted successfully (dummy log only).');
  }

  clearForm() {
    this.selectedDistributor = '';
    this.selectedPoNumber = '';
    this.documentType = '';
    this.invoiceFile = null;
    this.billFile = null;
  }
}
