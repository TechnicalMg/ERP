import { Component } from '@angular/core';
import { DistributorRegister, DistributorRegisterService } from '../../services/distributor-register.service';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OemRegister, OemRegisterService } from '../../services/oem-register.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amc-bifurcate',
  imports: [FormsModule,CommonModule],
  templateUrl: './amc-bifurcate.component.html',
  styleUrl: './amc-bifurcate.component.css'
})
export class AmcBifurcateComponent {
gemPoList: string[] = ['GEM/2024/B/123456', 'GEM/2024/B/654321', 'GEM/2024/B/987654'];
  selectedGemPo: string = this.gemPoList[0];
isPoSelected: boolean = false;

  selectedSno: number | null = null;
  showAll: boolean = false;
  disableShowAll: boolean = false;

  demoItems = [
    { sno: 1, description: 'Item A Model model2 Brand Lenovo', quantity: 10, price: 1000 },
    { sno: 2, description: 'Item B Model model2 Brand Hp', quantity: 5, price: 500 },
    { sno: 3, description: 'Item C Model model3 Brand Dell', quantity: 8, price: 800 }
  ];

  lineItemRowsBySno: { [sno: number]: any[] } = {};

  distributorList = ['Distributor X', 'Distributor Y', 'Distributor Z'];
  oemList = ['OEM A', 'OEM B', 'OEM C'];
  itemTypes: string[] = ['Hardware', 'Software', 'Networking'];

 distributors: DistributorRegister[] = [];

  poLineColumns = [
  { key: 'select', header: 'Select' },
  { key: 'id', header: 'S.No.' },
  { key: 'description', header: 'Description' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unitPrice', header: 'Price' }
];
 onEdit(row: any) {
    console.log('Edit', row);
  }

  onDelete(row: any) {
    console.log('Delete', row);
  }

  onView(row: any) {
    console.log('View', row);
  }

  ngOnInit(): void {
    // Load PO list or data if required
      this.loadPoNumbers();
      this.loadDistributorList();
      this.loadOemList();

  }

  loadDistributorList()
  {
     this.service.getAll().subscribe(res => {
      this.distributors = res;
    });
    console.log("distributors List are---->",this.distributors);
  }

  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaderssss",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  oems: OemRegister[] = [];
  loadOemList()
  {
     this.http.get<any>(`${environment.apiBaseUrl}/api/oem_register/view-all`, {
                     headers: this.getDbHeaders()
                   }).subscribe({
       
                      next: (data) => {this.oems = data;},
           error: () => alert('Error fetching user menus')
                   
           });
  //  this.oemService.getAllOEMs().subscribe({
  //     next: (res) => this.oems = res,
  //     error: (err) => console.error('Error fetching OEMs:', err)
  //   });

    console.log("oems List are---->",this.oems);
  }


  constructor(
    private poService: PurchaseOrderService,
    private fb: FormBuilder,
    private http: HttpClient,
    private service: DistributorRegisterService,
    private oemService: OemRegisterService
    // private datePipe: DatePipe
  ) {}
poNumbers: string[] = [];  

loadPoNumbers() {
    this.poService.getAllPoNumbers(this.getDbHeaders()).subscribe({
      // next: (res) => {this.poNumbers = res.data
      next: (res) => {this.gemPoList = res.data
        console.log("data for all the po numbers",this.poNumbers);
      },
      error: (err) => console.error('Error loading PO numbers:', err)
    });
  }

  onPoSelectionChange(): void {
    // Optional: load data based on PO selection
    this.selectedSno = null;
    this.showAll = false;
    this.disableShowAll = false;
    this.lineItemRowsBySno = {};
  }

  onCheckboxChange(item: any): void {
    if (this.selectedSno === item.sno) {
      this.selectedSno = null;
      this.disableShowAll = false;
    } else {
      this.selectedSno = item.sno;
      this.showAll = false;
      this.disableShowAll = true;
    }
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    if (this.showAll) {
      this.selectedSno = null;
    }
  }

  addRowOrignal(): void {
    if (!this.selectedSno) return;

    if (!this.lineItemRowsBySno[this.selectedSno]) {
      const item = this.demoItems.find(i => i.sno === this.selectedSno);
      this.lineItemRowsBySno[this.selectedSno] = [];
    }

    const item = this.poDetails.find(i => i.sno === this.selectedSno);
    console.log(" kjasgg item",item);
    this.lineItemRowsBySno[this.selectedSno].push({
      sno: item?.sno || 0,
      // description: item?.brand || '',
  
      
      // description: "Product Name: "+item?.productName || '' + "Brand: " + item?.brand || '' 
      // + "BrandType:" + item?.brandType || '' 
      // + "Model: " + item?.model || '' 
      // + "Catalogue Status: " + item?.catalogueStatus || '' 
      // + "Selling As: " + item?.sellingAs || '' ,

      description: "Product Name: "+item?.productName + ",Brand: " + item?.brand+ ",BrandType:" + item?.brandType  + ",Catalogue Status: " + item?.catalogueStatus + ",Selling As: " + item?.sellingAs+ " ,Model: " + item?.model ,
      partNo: '',
      modelNo: '',
      distributor: '',
      oem: '',
      itemType: '',
      qty: item?.quantity,
      // unitPrice: item?.unitPrice || '',
      
      unitPrice: (item?.unitPrice || '').toString().replace(/,/g, ''),
      totalPrice: 0
    });
  }

  

  addRow(): void {
  if (!this.selectedSno) return;

  const item = this.poDetails.find(i => i.sno === this.selectedSno);
  if (!item) return;

  const newRow = {
    sno: item.sno,
    description: `${item.description}`,
    // partNo: '',
    // modelNo: '',
    // distributor: '',
    oem: '',
    itemType: '',
    qty: item.quantity,
    unitPrice: (item.unitPrice || '').toString().replace(/,/g, ''),
    totalPrice: 0,
    startDate: `${item.serviceStartDate}`,
    endDate: `${item.serviceEndDate}`,
    isOwn: ''
  };

  // Add to grouped by sno
  if (!this.lineItemRowsBySno[item.sno]) {
    this.lineItemRowsBySno[item.sno] = [];
  }
  this.lineItemRowsBySno[item.sno].push(newRow);

  // Add to master list
  this.detailTableData.push(newRow);
}


  get filteredDetailsOrignal(): any[] {
    if (this.showAll) {
      return Object.values(this.lineItemRowsBySno).flat();
    }
    return this.selectedSno && this.lineItemRowsBySno[this.selectedSno]
      ? this.lineItemRowsBySno[this.selectedSno]
      : [];
  }

  get filteredDetails(): any[] {
  if (this.showAll) return this.detailTableData;
  return this.selectedSno
    ? this.detailTableData.filter(row => row.sno === this.selectedSno)
    : [];
}

  updateTotalPrice(row: any): void {
    const qty = Number(row.qty) || 0;
    const unitPrice = Number(row.unitPrice) || 0;
    row.totalPrice = +(qty * unitPrice).toFixed(2);
  }

  // saveData(): void {
  //   const dataToSave = this.showAll
  //     ? this.filteredDetails
  //     : this.lineItemRowsBySno[this.selectedSno!] || [];

  //   console.log('Saving data:', dataToSave);
  //   // TODO: Send dataToSave to backend API via service
  // }

//  detailTableData: any[] = [];
detailTableData: any[] = []; // master array
// filteredDetails: any[] = []; // currently visible/editable subset
  saveDataOrignal() {

//     const dataToSave = this.showAll
//       ? this.filteredDetails
//       : this.lineItemRowsBySno[this.selectedSno!] || [];

//     console.log('Saving data:', dataToSave);
//   const payload = this.filteredDetails.map(row => ({
//     gemNo: this.selectedGemPo,
//     sno: row.sno,
//     description: row.description,
//     partNo: row.partNo,
//     modelNo: row.modelNo,
//     distributor: row.distributor,
//     oem: row.oem,
//     itemType: row.itemType,
//     qty: row.qty,
//     unitPrice: row.unitPrice,
//     totalPrice: row.totalPrice
//   }));

//   console.log("payload ",payload);

//   console.log("environment apiBaseURl"+environment.apiBaseUrl);
//   // this.http.post( `${environment.apiBaseUrl}`+'/api/product-bifurcation/save', payload).subscribe({
//   //   next: () => alert('Saved Successfully'),
//   //   error: () => alert('Error saving item details')
//   // });
//   this.http.post(`${environment.apiBaseUrl}/api/amc-bifurcation/saveAmc `, payload, { responseType: 'text' }).subscribe({
//   next: (res) => {
//     console.log("Backend response:", res);
//     alert('Saved Successfully');
//   },
//   error: (err) => {
//     console.error("Error:", err);
//     alert('Error saving item details');
//   }
// });

console.log('Selected GEM PO:', this.selectedGemPo);
    console.log('Detail Table Data:', this.detailTableData);

 const payload = {
    gemPoNumber: this.selectedGemPo,
    details: this.detailTableData.map(row => ({
      sno: row.sno,
      description: row.description,
      startDate: row.startDate,
      endDate: row.endDate,
      isOwn: row.isOwn,
      oem: row.oem,
      itemType: row.itemType,
      totalPrice: row.totalPrice
    }))
  };

  console.log("payload",payload);
  // this.http.post(`${environment.apiBaseUrl}/api/amc-bifurcation/save`, payload).subscribe({
  //   next: res => alert('Saved successfully!'),
  //   error: err => alert('Save failed!')
  // });



}


showPayLoad(): void {
  const payload = {
    gemPoNumber: this.selectedGemPo,
    details: this.detailTableData.map(row => ({
      sno: row.sno,
      description: row.description,
      startDate: row.startDate,
      endDate: row.endDate,
      isOwn: row.isOwn,
      oem: row.oem,
      // oem:"MIB",
      itemType: row.itemType,
      totalPrice: row.unitPrice
    }))
  };

  console.log("Saving payload", payload);
}

saveData(): void {
  const payload = {
    gemPoNumber: this.selectedGemPo,
    details: this.detailTableData.map(row => ({
      sno: row.sno,
      description: row.description,
      startDate: row.startDate,
      endDate: row.endDate,
      own: row.isOwn,
      oem: row.oem,
      // oem:"MIB",
      itemType: row.itemType,
      totalPrice: row.unitPrice
    }))
  };

  console.log("Saving payload", payload);

  // this.http.post(`${environment.apiBaseUrl}/api/amc-bifurcation/save`, payload, { responseType: 'text' }).subscribe({
  this.http.post(`${environment.apiBaseUrl}/api/amc-bifurcation/save`,  payload,
  {
    headers: this.getDbHeaders(), // ✅ Pass headers here
    responseType: 'text' as 'json' // ✅ Type assertion to avoid TypeScript error
  }).subscribe({
    next: (res) => {
      console.log("Saved successfully:", res);
      alert('Saved Successfully');
    },
    error: (err) => {
      console.error("Save error:", err);
      alert('Error saving item details');
    }
  });
}

deleteRowOrignal(index: number): void {
  if (confirm('Are you sure you want to delete this row?')) {
    this.filteredDetails.splice(index, 1);
  }
}
deleteRow(index: number): void {
  if (!confirm('Are you sure you want to delete this row?')) return;

  const deleted = this.filteredDetails[index];
  if (!deleted) return;

  // Remove from detailTableData
  const masterIndex = this.detailTableData.findIndex(row =>
    row.sno === deleted.sno && row.description === deleted.description
  );
  if (masterIndex !== -1) {
    this.detailTableData.splice(masterIndex, 1);
  }

  // Also remove from lineItemRowsBySno
  const list = this.lineItemRowsBySno[deleted.sno];
  if (list) {
    const innerIndex = list.findIndex(row => row.description === deleted.description);
    if (innerIndex !== -1) {
      list.splice(innerIndex, 1);
    }
  }
}

poDetails :any[]=[];
// purchaseOrders:any=[];
 searchPO(): void {

    console.log("search PO new one is called");
   this.isPoSelected = true;
  //  fjbsfkjkjbou ;
this.poService.searchByAllFieldsGemAmc(this.selectedGemPo,this.getDbHeaders()).subscribe(data => {
      this.poDetails = data;
      console.log("purchase orders",this.poDetails);
    }) 
    
    console.log("selected Gem Po",this.selectedGemPo);
    console.log("gem po list",this.gemPoList);
    console.log("po Details",this.poDetails);
    
  }

  autoResize(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto'; // Reset height
  textarea.style.height = textarea.scrollHeight + 'px'; // Set to content height
}
  
}
