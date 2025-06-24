import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { AmcDetails, ConsigneeAmcDetails, ConsigneeDetails, ProductDetail, PurchaseOrderDto } from '../../models/purchase-order.dto';
import { ApiResponse } from '../../models/api-response';
import { environment } from '../../../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
// import { ApiResponse } from '../../models/api-response.model';


interface EditedAmcDetail {
  quantity: number;
  uniPrice: number;
}
@Component({
  selector: 'app-purchase-order',
  imports: [FormsModule,CommonModule,ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent {


  poData: PurchaseOrderDto = new PurchaseOrderDto();
  headerText = "Upload Purchase Order PDF";
  selectedFile: File | null = null;
  mergedRows: { product: any, consignee: any }[] = [];
  // productDetails: any[] = [
  //   { code: '', name: '', quantity: 0, unitPrice: 0, total: 0 }
  // ];

  productDetails: any[] = [];
  amcDetails: any[] = []; 
  amcConsigneeDetails: any[] = []; 
  // editedAmcDetails:any[]=[];
  // editedAmcDetails:EditedAmcDetail[] = [];
  fmsDetails: any[]=[];
  fmcDetails: any[]=[];
  consigneeDetails: any[] = [
    { name: '', address: '', phone: '', email: '' }
  ];
  isLoading: boolean = false;
  isGem: boolean = false;
  

  // orderTypes: string[] = ['Product', 'AMC', 'Product+AMC', 'FMS'];
  orderTypes: string[] = ['Product', 'AMC', 'Product+AMC'];
selectedOrderType: string = this.orderTypes[0];


// rfp and bid
rfp_no:any;
bid_no:any;
rfp_date:any;
bid_date:any;
rfpFile: File | null = null;
bidFile: File | null = null;
onRfpFileSelected(event: any) {
  this.rfpFile = event.target.files[0];
}

onBidFileSelected(event: any) {
  this.bidFile = event.target.files[0];
}


uploadRfpFile() {
  console.log("coming inside upload rfp");
  if (!this.rfpFile) return;
  const formData = new FormData();
  formData.append('file', this.rfpFile);

  // this.http.post(` ${environment.apiBaseUrl}/api/purchase-order/upload/rfp`, formData, { responseType: 'text' })
  this.http.post(` ${environment.apiBaseUrl}/api/purchase-order/upload/rfp`, formData,
    {
    headers: this.getDbHeaders(), // ✅ Custom headers, excluding Content-Type
    responseType: 'text' // Correctly specify text response type
  }
    )
    .subscribe(path => {
      this.poData.rfpFileUploadPath = path as string;
      alert('RFP uploaded: ' + path);
    });
}

uploadBidFile() {
  console.log("coming inside upload bid");
  if (!this.bidFile) return;
  const formData = new FormData();
  formData.append('file', this.bidFile);

  this.http.post(` ${environment.apiBaseUrl}/api/purchase-order/upload/bid`, formData,
   {
    headers: this.getDbHeaders(), // ✅ Custom headers, excluding Content-Type
    responseType: 'text' // Correctly specify text response type
  }
  )
    .subscribe(path => {
      this.poData.bidFileUploadPath = path as string;
      alert('BID uploaded: ' + path);
    });
}

  constructor(private poService: PurchaseOrderService, private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.poService.uploadPdf(this.selectedFile,this.selectedOrderType, this.getDbHeaders() ).subscribe({
      next: (res) => {
        console.log(res.data);
        console.log(res.header);


        const gemPattern = /GEMC-\d+/;
      const dataStr = JSON.stringify(res.data); // convert object to string for regex search
      const isGem = gemPattern.test(dataStr);
      console.log("Extracted text",isGem);

        // this.headerText = res.isGemFile ? "GEM" : "Not a GEM File";
        this.headerText = isGem ? "GEM" : "Not a GEM File (Enter data manually:)";
        // console.log("header tet"+this.headerText);
        // if (res.isGemFile) this.poData = res.data;
        



          if( this.headerText!="Not a GEM File (Enter data manually:)")
          {
            this.isGem=false;
                   
this.consigneeDetails = res.data.consigneeDetails || [];


console.log("consignee details",this.consigneeDetails);
        // Convert backend item list to productDetails table
      this.productDetails = res.data.items?.map((item: any) => ({
        description: `${item.productName} ,(${item.model})  ,(${item.brandType}) ,(${item.catalogueStatus}), (${item.sellingAs}),(${item.brand}) ,(${item.hsnCode}) `, // Combine name & model
        quantity: item.quantity,
        productName:item.productName,
        brand:item.brand,
        model:item.model,
        brandType:item.brandType,
        catalogueStatus:item.catalogueStatus,
        sellingAs:item.sellingAs,
        categoryNameQaudrant:item.categoryNameQaudrant,
        hsnCode:item.hsnCode,
        
        // unit: item.quantity?.split(' ')[1] || '', // Extract 'pieces' from "2 pieces"
        unit: item.unit, // Extract 'pieces' from "2 pieces"
        unitPrice: item.unitPrice,
        tax: item.tax,
        totalPrice: item.totalPrice,

        // adding product details to consignee details
        

      })) || [];

      this.mergedRows = this.productDetails.map((product, i) => ({
  product,
  consignee: this.consigneeDetails[i] || {},

}));
  this.amcDetails=res.data.amcDetails||[];
  this.fmsDetails=res.data.fmsDetails||[];
  
  
this.poData = res.data;
          }
          if( this.headerText=="Not a GEM File (Enter data manually:)")
          {
            this.isGem=true;
            console.log("not a gem coming in if condition true , its not a gem file");
            this.clearForm();
          }
    // this.poData = res.data;
 
      console.log("product details",this.productDetails);
      console.log("res data",res);
         this.isLoading = false;
      },
      error: (err) => {console.error(err);
        this.isLoading = false;
      }


    });
  }








  printConsignee()
  {
    this.mergedRows.forEach((row, index) => {
  console.log(`Row ${index + 1}:`);
  console.log('  Product:', row.product);
  console.log('  Consignee:', row.consignee);
});
console.log("buyer detils" ,`${this.poData.buyerDesg} ,${this.poData.buyerContact}  ,(${this.poData.buyerEmail}) ,(${this.poData.buyerGstin}), (${this.poData.buyerAddress})`);
  }

 dbName ='';
       userName = '';
       userType = '';
       companyId = '';
       companyName = '';
       userEmail='';
        mainDb='ignitia_db';
 getDbHeaders(): HttpHeaders {
       this.dbName = sessionStorage.getItem('dbName') ?? '';
       this.userName = sessionStorage.getItem('userName') ?? '';
       this.userType = sessionStorage.getItem('userType') ?? '';
       this.companyId = sessionStorage.getItem('companyId') ?? '';
       this.companyName = sessionStorage.getItem('companyName') ?? '';
       this.userEmail = sessionStorage.getItem('userEmail') ?? '';

      return new HttpHeaders()
    .set('X-DB-Name', this.dbName)
    .set('X-Company-Id', this.companyId)
    .set('X-Company-Name', this.companyName)
    .set('X-User-Email', this.userEmail)
    .set('X-User-Name', this.userName)
    .set('X-User-Type', this.userType); 
    }


  saveData() {
    this.poData.productDetails = this.productDetails;

    this.poData.amcDetails = this.amcDetails;
    this.poData.consigneeAmcDetails = this.amcConsigneeDetails;
    console.log('consignee AMC DETAILS',this.poData.consigneeAmcDetails);
    console.log('Updated amcDetails:', this.amcDetails);
    console.log("ON SAVE po data product Details",this.poData.productDetails);
    console.log("ON SAVE amc data AMC Details",this.poData.amcDetails);
    console.log("ON SAVE po data Consignee Details",this.poData.consigneeDetails);
    console.log("ON SAVE PO DATA",this.poData);

    console.log("merged rows data",this.mergedRows);
    console.log("buyer detils" ,`${this.poData.buyerDesg} ,(${this.poData.buyerContact})  ,(${this.poData.buyerEmail}) ,(${this.poData.buyerGstin}), (${this.poData.buyerAddress})`);
    // this.poData.consigneeDetails=this.consigneeDetails;
    this.poData.consigneeDetails = this.mergedRows.map(row => ({
      // consigneeDetails: row.consignee.consigneeDetails, // Adjust as necessary
      consigneeDetails: `${this.poData.buyerDesg} ,${this.poData.buyerContact}  ,${this.poData.buyerEmail} ,${this.poData.buyerGstin}, ${this.poData.buyerAddress}`,
      item: row.product.productName, // Adjust as necessary
      // lotNo: row.product.lotNo, // Adjust as necessary
      lotNo: '-', // Adjust as necessary
      quantity: row.product.quantity, // Adjust as necessary
      deliveryStartDate: row.consignee.deliveryStartDate,
      deliveryEndDate:  row.consignee.deliveryEndDate // Adjust as necessary
    }));
    
    console.log("po data after merging",this.poData.consigneeDetails);
    
    this.poService.savePurchaseOrder(this.poData,this.selectedOrderType, this.getDbHeaders()).subscribe({
      next: (res) => {alert(res.message) 
        // this.clearForm();
      },
      error: (err) => console.error(err)
    });
  }



  addRowAmc(): void {
  const newRow: AmcDetails = {
    description: '',
    quantity: '',
    uniPrice: ''
  };
  this.amcDetails.push(newRow);
}
removeAmcRow(index: number): void {
  this.amcDetails.splice(index, 1);
}


removeAmcConsigneeRow(index: number): void {
  this.amcConsigneeDetails.splice(index, 1);
}

addRowAmcConsignee(): void {
  const newRow: ConsigneeAmcDetails = {
    consigneeDetails: '',
    serviceDetails: '',
  };
  this.amcConsigneeDetails.push(newRow);
}
addRow(): void {

  const newRow = {
    productName: '',
    brand: '',
    brandType: '',
    catalogueStatus: '',
    sellingAs: '',
    categoryNameQaudrant: '',
    model: '',
    hsnCode: '',
    quantity: '',
    unit: '',
    unitPrice: '',
    taxBifurcation: '',
    totalPrice: ''
  };

  this.productDetails.push(newRow);
}
removeRow(index: number) {
  this.productDetails.splice(index, 1);
}


// removeRow(index: number) {
//   this.productDetails.splice(index, 1);
//   this.consigneeDetails.splice(index, 1);
//   this.mergedRows.splice(index, 1);
// }

autoResize(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto'; // Reset height
  textarea.style.height = textarea.scrollHeight + 'px'; // Set to content height
}
clearForm() {
  // Clear all form fields in poData
  this.poData = {
    poNumber: '',
    poDate: '',
    bidNumber: '',
    organisationType: '',
    organisationMinistry: '',
    organisationDepartment: '',
    organisationName: '',
    buyerDesg: '',
    buyerContact: '',
    buyerEmail: '',
    buyerGstin: '',
    buyerAddress: '',
    ifdConcurrence: '',
    desgAdminApproval: '',
    desgFinalApproval: '',
    payingRole: '',
    payingMode: '',
    payingDesg: '',
    payingEmail: '',
    payingGstin: '',
    payingAddress: '',
    miiStatus: '',
    msmeVerified: '',
    msmeRegistrationNumber: '',
    mseSocialCategory: '',
    mseGender: '',
    mseGstin: '',
    rfpNo: '',
    rfpDate: new Date(),
    rfpFileUploadPath: '',
    bidNo: '',
    bidDate: new Date(),
    bidFileUploadPath: '',
 
    productDetails: [],
    amcDetails:[],
    consigneeDetails: [],
    consigneeAmcDetails:[]
  };
  this.productDetails = [];
  this.amcDetails = [];
  this.amcConsigneeDetails=[];

 
  this.mergedRows = [];
  this.cdRef.detectChanges();  // force update view
}

}
