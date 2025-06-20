import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DistributorRegisterService } from '../../../services/distributor-register.service';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-item-inspection',
  imports: [CommonModule,FormsModule],
  templateUrl: './item-inspection.component.html',
  styleUrl: './item-inspection.component.css'
})
export class ItemInspectionComponent {
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
  generalRemark:string="";
allVerified:boolean=false;

inspector_name:any="";
selectedinspectionType:string="";
new_inspector_name:string="";
new_inspector_designation:string="";
new_inspector_agency:string="";
otherInspectorEnabled: boolean = false;

  // to select all checkboxes in table
  selectAllCheckbox:boolean=true;
  savedEntries: any[] = [];
  

  constructor(
    private poService: PurchaseOrderService,
    private fb: FormBuilder,
    private http: HttpClient,
    private service: DistributorRegisterService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
    console.log("getttitttting data dv name",sessionStorage.getItem('userName'));
    this.inspector_name=sessionStorage.getItem('userName');
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

  }

  // Optional: Apply delivery date to all items
  setDateForAllItems() {
    if (!this.dateForAllItems) return;
    this.filteredGemPoItems.forEach(item => item.eddDate = this.dateForAllItems);
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

  // const payload = {
  //   gemPoId: this.selectedGemPoId,
  //   gemPoNumber: this.selectedGemPo,
  //   distributor: this.selectedDistributor,
  //   genRemark:this.generalRemark,
  //   items: this.filteredGemPoItems
  //     .filter(item => item.eddDate) // Only include if EDD is set
  //     .map(item => ({
  //       itemName: item.description,
  //       quantity: item.qty,
  //       verified: item.isVerified,
  //       itemId: item.remarks
  //     }))
  // };

  const totalItems = this.filteredGemPoItems.length;
  const itemsWithVerification = this.filteredGemPoItems.filter(item => item.checked).length;

  const allVerificationEntered = itemsWithVerification === totalItems;
console.log("value for all dates entered: yes or no",allVerificationEntered);
  console.log(`Total items: ${totalItems}, Items with verification: ${itemsWithVerification}`);


  const payload = {
  distributorName: this.selectedDistributor,
  gemPo: this.selectedGemPo,
  referenceNumber: this.getSelectedPo()?.referenceNo,
  inspectionPname: this.inspector_name,
  inspectionType: this.selectedinspectionType,
  newInspectionPname: this.otherInspectorEnabled ? this.new_inspector_name : null,
  newInspectionDesignation: this.otherInspectorEnabled ? this.new_inspector_designation : null,
  newInspectionAgency: this.otherInspectorEnabled ? this.new_inspector_agency : null,
  generalRemark: this.generalRemark,
  fullVerification: allVerificationEntered, 
  items: this.filteredGemPoItems.map(item => ({
    description: item.description,
    qty: item.qty,
    verified: item.checked,
    remarks: item.remarks
  }))
};



  console.log("Saving delivery details payload:", payload);

  this.http.post(`${environment.apiBaseUrl}/api/inspection/save`, payload, {
    headers: this.getDbHeaders()
  }).subscribe({
    next: (res) => {
      alert("Delivery details saved successfully!");
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

 ngOnChanges() {
  this.toggleAllCheckboxes();
}

toggleAllCheckboxes() {
  this.filteredGemPoItems.forEach(item => item.checked = this.selectAllCheckbox);
}
}
