  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { FormBuilder, FormsModule } from '@angular/forms';
  import { PurchaseOrderService } from '../../../services/purchase-order.service';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { DistributorRegisterService } from '../../../services/distributor-register.service';
  import { environment } from '../../../../environments/environment';

  import * as XLSX from 'xlsx';


interface IssuedPoResponse {
  IssuedPos: string[];
}
interface InspectionItem {
  description: string;
  qty: number;

  acceptedQty?: number;
  rejectedQty?: number;

  /* NEW */
  acceptedSerialStr?: string;   // comma-separated string for UI
  rejectedSerialStr?: string;   // comma-separated string for UI

  checked?: boolean;
  remarks?: string;
}




export interface InvoiceItemBackEnd {
  description: string;
  qtyOrdered: number;     // ← coming field names
  currentQty: number;
}

export interface IssuedPoInvoice {
  challanNo: string;
  challanDate: string;
  challanRecDate: string;
  vehicleNo: string;
  transporter: string;
  billPath: string;
  items: InvoiceItemBackEnd[];
}

interface IssuedPoResponse {
  IssuedPos: string[];
}


  @Component({
    selector: 'app-item-inspection',
    imports: [CommonModule,FormsModule],
    templateUrl: './item-inspection.component.html',
    styleUrl: './item-inspection.component.css'
  })
  export class ItemInspectionComponent {
//   allDetails: any[] = [];
//     distributors: any[] = [];
//     invoiceNoLists:any[]=[];

//       selectedIssuedPo: string = '';
//       selectedInvoiceNo: string = '';


//     dateForAllItems: string | null = null;
//     estimateDeliveryDate: string | null = null;
//     generalRemark:string="";

//     inspector_name:any="";
//    selectedinspectionType:string="";
//    new_inspector_name:string="";
//    new_inspector_designation:string="";
//    new_inspector_agency:string="";
//     otherInspectorEnabled: boolean = false;
    
//     savedEntries: any[] = [];

//     inspectionDate: string = '';
//     todayDate: string = '';
//     inspectionType:string='';


//      acceptedQty: number=0;
//   rejectedQty: number=0;
//   acceptedSerialStr: string="";
//   rejectedSerialStr: string="";
//   checked: boolean=false;
//   remarks: string="";
//     constructor(
//       private poService: PurchaseOrderService,
//       private fb: FormBuilder,
//       private http: HttpClient,
//       private service: DistributorRegisterService
//     ) {}

//     ngOnInit(): void {
//       this.getAllIssuedPo();
    
//       console.log("getting userName ",sessionStorage.getItem('userName'));
//       this.inspector_name=sessionStorage.getItem('userName');

//        // Set today's date in yyyy-MM-dd format
//   const today = new Date();
//   this.todayDate = today.toISOString().split('T')[0];

//     }

// allIssuedPos:any[]=[];
//     getAllIssuedPo(){
//       this.http.get<IssuedPoResponse>(`${environment.apiBaseUrl}/api/inspection/fetch-ReferenceNo`,{headers:this.getDbHeaders()})
//       .subscribe({
//         next:(data)=>{
         
//           this.allIssuedPos= data.IssuedPos ?? [];

//           console.log("ALL issued pos",this.allIssuedPos);
//         },error:(err)=>console.log(err)
//       })
//     }
//     getDbHeaders(): HttpHeaders {
//       const dbName = sessionStorage.getItem('dbName');
//       return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
//     }

   

  
  


//     onPoSelect(selectedReferenceNo: string) {


//  this.http.get<any>(`${environment.apiBaseUrl}/api/inspection/fetch-invoiceNo?referenceNo=${this.selectedIssuedPo}`, {
//         headers: this.getDbHeaders()
//       }).subscribe({
//         next: (data) => {
//           this.invoiceNoLists = data.challanNos || [];;
         
//           console.log("All invoice numbers:", this.invoiceNoLists);
//         },
//         error: () => alert('Error fetching PO data')
//       });

 
// //   this.http.get(`${environment.apiBaseUrl}/api/inspection/fetch?gemPo=${this.selectedGemPo}&referenceNo=${this.selectedIssuedPo}`, {
// //   headers: this.getDbHeaders()
// // }).subscribe({
// //   next: (inspectionData: any) => {
// //     if (inspectionData?.items?.length) {
// //       this.filteredIssuedPoItems.forEach((item, i) => {
// //         const matched = inspectionData.items[i];
// //         if (matched) {
// //           item.checked = matched.verified;
// //           item.remarks = matched.remarks;
// //           item.acceptedQty = matched.acceptedQty;
// //           item.rejectedQty = matched.rejectedQty;
// //           item.partNoSerialNo=matched.serialno;
// //         }
// //         console.log(inspectionData.items[i]);
// //       });
// //       this.generalRemark = inspectionData.generalRemark;
// //       this.inspectionDate=inspectionData.inspectionDate;
// //       this.new_inspector_name=inspectionData.newInspectionPname;
// //       this.new_inspector_designation=inspectionData.newInspectionDesignation;
// //       this.new_inspector_agency=inspectionData.newInspectionAgency;
// //       this.inspectionType=inspectionData.inspectionType;
// //     }
// //   },
// //   error: () => {
// //     console.log('No inspection data found for this PO');
// //   }
// // });
// }

// allInvoiceDetails:any[]=[];
//  invoicePoItems:any[]=[];

// selectedInvoice?: IssuedPoInvoice;
// onInvoiceSelect(selectedInvoiceNo: string) {
//    this.http.get<{ allIssuedPoInvoice: IssuedPoInvoice[] }>(`${environment.apiBaseUrl}/api/inspection/fetch-invoiceNo-Details?referenceNo=${this.selectedIssuedPo}`, {
//         headers: this.getDbHeaders()
//       }).subscribe({
//       // next: ({ allIssuedPoInvoice }) => {
         
//       //     this.allInvoiceDetails = allIssuedPoInvoice ?? [];

//       //     console.log("Selected chalan no:", selectedInvoiceNo);
         
//       //     this.invoicePoItems = this.selectedInvoice?.items ?? [];

//       //     /*  ✨  (optional) log for debugging */
//       //     console.log('ALL DATA  invoice ➡', allIssuedPoInvoice.items);
//       //     console.log('Selected invoice ➡', this.selectedInvoice);
//       //     console.log('Selected invoice Items➡', this.invoicePoItems);
//       //   },
//       //   error: err => {
//       //     console.error('Error fetching PO data', err);
//       //     alert('Error fetching PO data');
//       //   },
//       // });
//        next: ({ allIssuedPoInvoice }) => {
//         /* 1. cache everything we got */
//         this.allInvoiceDetails = allIssuedPoInvoice ?? [];

//         /* 2. locate the chosen invoice */
//         // this.selectedInvoice = this.allInvoiceDetails.find(
//         //   inv => inv.challanNo === selectedInvoiceNo,
//         // );

//         /* 3. show its items in the table (or empty if none) */
//         this.invoicePoItems = this.selectedInvoice
//           ? this.selectedInvoice.items.map(item => ({
//               ...item,          // description, qty, currentQty, …
//               acceptedQty: 0,   // UI‑only fields you’ll edit later
//               rejectedQty: 0,
//               acceptedSerialStr: '',
//               rejectedSerialStr: '',
//               checked: false,
//               remarks: '',
//             }))
//           : [];

//         /* debug */
//         console.log('Chosen invoice ➡', this.selectedInvoice);
//         console.log('Items for table ➡', this.invoicePoItems);
//       },
//       error: err => {
//         console.error('Error fetching invoice details', err);
//         alert('Error fetching invoice details');
//       },
//     });


//   }




   
//   saveData() {
//     // if (!this.selectedGemPo || this.invoicePoItems.length === 0) {
//     //   alert("Please select a GEM PO and ensure there are items to save.");
//     //   return;
//     // }
   


//     const totalItems = this.invoicePoItems.length;
//     const itemsWithVerification = this.invoicePoItems.filter(item => item.checked).length;

//     const allVerificationEntered = itemsWithVerification === totalItems;
//   console.log("value for all dates entered: yes or no",allVerificationEntered);
//     console.log(`Total items: ${totalItems}, Items with verification: ${itemsWithVerification}`);


//     const payload = {
//     // distributorName: this.selectedDistributor,
//     // gemPo: this.selectedGemPo,
// gemPo:"",
//     // referenceNumber: this.getSelectedPo()?.referenceNo,
//     referenceNumber: this.selectedIssuedPo,
//     inspectionPname: this.inspector_name,
//     inspectionType: this.inspectionType,
//     newInspectionPname: this.otherInspectorEnabled ? this.new_inspector_name : null,
//     newInspectionDesignation: this.otherInspectorEnabled ? this.new_inspector_designation : null,
//     newInspectionAgency: this.otherInspectorEnabled ? this.new_inspector_agency : null,
//     generalRemark: this.generalRemark,
//     fullVerification: allVerificationEntered, 
   

//     inspectionDate: this.inspectionDate, 

//     items: this.invoicePoItems.map(item => ({
//       description: item.description,
//       qty: item.qty,
//       verified: item.checked,
//       remarks: item.remarks,
//       getAcceptedQty: item.acceptedQty,
//       getRejectedQty: item.rejectedQty,
//       // serialNo: item.partNoSerialNo
//       serialNo: item.acceptedSerialStr+"-"+item.rejectedSerialStr

//     }))
//   };



//     console.log("Saving delivery details payload:", payload);
// // checking for payload first here
//     this.http.post(`${environment.apiBaseUrl}/api/inspection/save`, payload, {
//       headers: this.getDbHeaders()
//     }).subscribe({
//       next: (res) => {
//         alert("Delivery details saved successfully!");
//         // Optional: Reset form or reload
//       },
//       error: (err) => {
//         console.error("Error saving delivery:", err);
//         alert("Failed to save delivery details.");
//       }
//     });
//   }


 
 

  
//   onAcceptedQtyChange(item: any) {
//   const accepted = Number(item.acceptedQty);
//   const total = Number(item.qty);
//   if (!isNaN(accepted) && !isNaN(total)) {
//     item.rejectedQty = Math.max(0, total - accepted);
//   } else {
//     item.rejectedQty = '';
//   }
// }

// onExcelUpload1(event: any) {
//   const target: DataTransfer = <DataTransfer>(event.target);
//   if (target.files.length !== 1) {
//     alert('Only one file can be uploaded at a time.');
//     return;
//   }

//   const reader: FileReader = new FileReader();
//   reader.onload = (e: any) => {
//     const bstr: string = e.target.result;
//     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
//     const wsname: string = wb.SheetNames[0];
//     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//     const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

//     // Assuming structure: First row is headers, and values are in second column onwards
//     const serialNumbers = data.slice(1).map(row => row[0]).filter(v => !!v);

//     if (serialNumbers.length > 0 && serialNumbers.length === this.invoicePoItems.length) {
//       this.invoicePoItems.forEach((item, i) => {
//         item.partNoSerialNo = serialNumbers[i];
//       });
//       alert('Part No./Serial No. mapped successfully!');
//     } else {
//       alert('Excel rows do not match the number of items.');
//     }
//   };
//   reader.readAsBinaryString(target.files[0]);
// }

// onExcelUpload(event: any) {
//   const target: DataTransfer = <DataTransfer>(event.target);
//   if (target.files.length !== 1) {
//     alert('Only one file can be uploaded at a time.');
//     return;
//   }

//   const reader: FileReader = new FileReader();
//   reader.onload = (e: any) => {
//     const bstr: string = e.target.result;
//     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
//     const wsname: string = wb.SheetNames[0];
//     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

//     const data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
//     const valuesOnly = data.slice(1).map(row => row[0]).filter(v => v != null && v !== '');

//     console.log("Excel values:", valuesOnly);

//     if (valuesOnly.length === this.invoicePoItems.length) {
//       this.invoicePoItems.forEach((item, i) => {
//         item.partNoSerialNo = valuesOnly[i];
//       });
//       alert('Serial numbers mapped successfully!');
//     } else {
//       alert(`Row mismatch: Found ${valuesOnly.length} values, but ${this.invoicePoItems.length} items exist.`);
//     }
//   };
//   reader.readAsBinaryString(target.files[0]);
// }




// onSerialUpload(event: Event, rowIndex: number, type: 'accepted' | 'rejected'): void {
//   const target = event.target as HTMLInputElement;
//   if (!target.files || target.files.length !== 1) {
//     alert('Please select exactly one Excel file.');
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = (e: any) => {
//     const wb = XLSX.read(e.target.result, { type: 'binary' });
//     const wsname = wb.SheetNames[0];
//     const ws = wb.Sheets[wsname];

//     /* Expect serial numbers in first column, one per row */
//     const rows: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
//     const serialNos = rows.slice(1)              // skip header
//                           .map(r => r[0])
//                           .filter(v => !!v);

//     /* Join with comma for UI */
//     const serialStr = serialNos.join(', ');

//     const item = this.invoicePoItems[rowIndex];

//     if (type === 'accepted') {
//       /* optional: validate count matches acceptedQty */
//       if (item.acceptedQty != null && serialNos.length !== +item.acceptedQty) {
//         alert(`Accepted Qty (${item.acceptedQty}) ≠ ${serialNos.length} serial numbers!`);
//         return;
//       }
//       item.acceptedSerialStr = serialStr;
//     } else {
//       /* rejected */
//       if (item.rejectedQty != null && serialNos.length !== +item.rejectedQty) {
//         alert(`Rejected Qty (${item.rejectedQty}) ≠ ${serialNos.length} serial numbers!`);
//         return;
//       }
//       item.rejectedSerialStr = serialStr;
//     }
//   };

//   reader.readAsBinaryString(target.files[0]);
// }

  /* ───── dropdown data ───── */
  allIssuedPos: any[] = [];
  invoiceNoLists: any[] = [];

  /* ───── selections ───── */
  selectedIssuedPo = '';
  selectedInvoiceNo = '';

  /* ───── date / misc ───── */
  inspectionDate = '';
  todayDate = new Date().toISOString().split('T')[0];
  inspectionType = 'In Office';
  inspector_name = sessionStorage.getItem('userName') ?? '';

  /* ───── optional other inspector ───── */
  otherInspectorEnabled = false;
  new_inspector_name = '';
  new_inspector_designation = '';
  new_inspector_agency = '';

  /* ───── table rows after merge ───── */
  combinedItems: any[] = [];

  /* ───── remark ───── */
  generalRemark = '';

  constructor(private http: HttpClient) {}

  /* ---------- helpers ---------- */
  private getDbHeaders(): HttpHeaders {
    const db = sessionStorage.getItem('dbName');
    return new HttpHeaders({ 'X-DB-Name': db ?? '' });
  }

  ngOnInit(): void {
    this.fetchAllIssuedPo();
  }

  /* ---------- 1. load PO list ---------- */
  fetchAllIssuedPo(): void {
    this.http.get<any>(`${environment.apiBaseUrl}/api/inspection/fetch-ReferenceNo`,
      { headers: this.getDbHeaders() }
    ).subscribe({
      next: res => this.allIssuedPos = res.IssuedPos || [],
      error: err => console.error('PO list error', err)
    });
  }

  /* ---------- 2. PO selected: load challans ---------- */
  onPoSelect(po: string): void {
    this.selectedIssuedPo = po;
    this.selectedInvoiceNo = '';
    this.combinedItems = [];

    this.http.get<any>(`${environment.apiBaseUrl}/api/inspection/fetch-invoiceNo`,
      { params: { referenceNo: po }, headers: this.getDbHeaders() }
    ).subscribe({
      next: res => this.invoiceNoLists = res.challanNos || [],
      error: err => console.error('Challan list error', err)
    });
  }

  /* ---------- 3. challan selected: fetch details + inspection ---------- */
  onInvoiceSelect1(challanNo: string): void {
    this.selectedInvoiceNo = challanNo;
    if (!challanNo) { this.combinedItems = []; return; }

    /* A. get IssuedPoChallan + items */
    this.http.get<any>(`${environment.apiBaseUrl}/api/inspection/fetch-invoiceNo-Details`,
      { params: { referenceNo: this.selectedIssuedPo }, headers: this.getDbHeaders() }
    ).subscribe({
      next: res => {
        /* there can be many challans for the PO – find the chosen one */
        const challan = (res.allIssuedPoInvoice || [])
          .find((c: any) => c.challanNo === challanNo);

        const challanItems = challan ? challan.items || [] : [];

          console.log('Challan items:', challanItems);
        /* B. also try to fetch inspection (might not exist) */
        this.http.get<any>(`${environment.apiBaseUrl}/api/inspection/fetchInspection-by-ref-no`,
          {
            params: {
              // gemPo: this.selectedIssuedPo,        // gemPo param is mandatory in your API; using issuedPo
              referenceNo: this.selectedIssuedPo   // per your controller
            },
            headers: this.getDbHeaders()
          }
        ).subscribe({

          next: insp => {
            console.log('Existing inspection:', insp);
            const inspMap = new Map<string, any>();
            (insp.items || []).forEach((it: any) => inspMap.set(it.description, it));

            /* merge */
            this.combinedItems = challanItems.map((ci: any) => {
              const inspItem = inspMap.get(ci.description) || {};
              return {
                /* from challan */
                description: ci.description,
                qtyOrdered:  ci.qtyOrdered,
                prevQty:     ci.prevQty,
                currentQty:  ci.currentQty,
                /* from inspection or defaults */
                acceptedQty:   inspItem.acceptedQty ?? 0,
                rejectedQty:   inspItem.rejectedQty ?? 0,
                serialNo:      inspItem.serialno     ?? '',
                verified:      inspItem.verified     ?? false,
                remarks:       inspItem.remarks      ?? ''
              };
            });
          },
          error: _ => {
            /* No inspection yet → use challan items only */
            this.combinedItems = challanItems.map((ci: any) => ({
              description: ci.description,
              qtyOrdered:  ci.qtyOrdered,
              prevQty:     ci.prevQty,
              currentQty:  ci.currentQty,
              acceptedQty: 0,
              rejectedQty: 0,
              serialNo: '',
              verified: false,
              remarks: ''
            }));
          }
        });
      },
      error: err => {
        console.error('Challan details error', err);
        this.combinedItems = [];
      }
    });
  }


  onInvoiceSelect(challanNo: string): void {
  /* keep the UI value */
  this.selectedInvoiceNo = challanNo;

  /* nothing chosen → clear table */
  if (!challanNo) {
    this.combinedItems = [];
    return;
  }

  /* STEP A – get the IssuedPoChallan (and its items) for this PO */
  this.http.get<any>(
        `${environment.apiBaseUrl}/api/inspection/fetch-invoiceNo-Details`,
        { params: { referenceNo: this.selectedIssuedPo },
          headers: this.getDbHeaders() })
    .subscribe({
      next: res => {
        /* find the exact challan inside the list */
        const challan = (res.allIssuedPoInvoice || [])
                        .find((c: any) => c.challanNo === challanNo);

        const challanItems: any[] = challan ? challan.items || [] : [];

        /* STEP B – try to load an inspection record (may not exist) */
        this.http.get<any>(
              `${environment.apiBaseUrl}/api/inspection/fetchInspection-by-ref-no`,
              { params: { referenceNo: this.selectedIssuedPo },
                headers: this.getDbHeaders() })
          .subscribe({
            /* ---- inspection FOUND ---- */
            next: insp => {
              /* if insp is null OR insp.items empty → treat as “no inspection yet” */
              if (!insp || !insp.items || insp.items.length === 0) {
                this.combinedItems = challanItems.map(ci => ({
                  description: ci.description,
                  qtyOrdered:  ci.qtyOrdered,
                  prevQty:     ci.prevQty,
                  currentQty:  ci.currentQty,
                  acceptedQty: 0,
                  rejectedQty: 0,
                  serialNo:    '',
                  verified:    false,
                  remarks:     ''
                }));
                return;   // done
              }

              /* merge challan rows with inspection data */
              const inspMap = new Map<string, any>();
              insp.items.forEach((it: any) => inspMap.set(it.description, it));

              this.combinedItems = challanItems.map(ci => {
                const ii = inspMap.get(ci.description) || {};
                return {
                  description: ci.description,
                  qtyOrdered:  ci.qtyOrdered,
                  prevQty:     ci.prevQty,
                  currentQty:  ci.currentQty,
                  acceptedQty: ii.acceptedQty ?? 0,
                  rejectedQty: ii.rejectedQty ?? 0,
                  serialNo:    ii.serialno    ?? '',
                  verified:    ii.verified    ?? false,
                  remarks:     ii.remarks     ?? ''
                };
              });
            },

            /* ---- inspection NOT found (404 / 500 / network) ---- */
            error: _ => {
              this.combinedItems = challanItems.map(ci => ({
                description: ci.description,
                qtyOrdered:  ci.qtyOrdered,
                prevQty:     ci.prevQty,
                currentQty:  ci.currentQty,
                acceptedQty: 0,
                rejectedQty: 0,
                serialNo:    '',
                verified:    false,
                remarks:     ''
              }));
            }
          });
      },

      /* couldn’t load challan details at all */
      error: err => {
        console.error('Challan details error', err);
        this.combinedItems = [];
      }
    });
}
  /* ---------- qty change = recalc rejected ---------- */
  onAcceptedQtyChange(row: any): void {
    const total = Number(row.currentQty ?? 0);
    const acc   = Number(row.acceptedQty ?? 0);
    row.rejectedQty = Math.max(0, total - acc);
  }

  /* ---------- save ---------- */
  saveData(): void {
    if (!this.selectedIssuedPo || !this.selectedInvoiceNo) {
      alert('Select PO and challan first'); return;
    }

    const payload: any = {
      referenceNumber: this.selectedIssuedPo,
      challanNo: this.selectedInvoiceNo,
      inspectionPname: this.inspector_name,
      inspectionDate: this.inspectionDate,
      inspectionType: this.inspectionType,
      generalRemark: this.generalRemark,
      newInspectionPname: this.otherInspectorEnabled ? this.new_inspector_name : null,
      newInspectionDesignation: this.otherInspectorEnabled ? this.new_inspector_designation : null,
      newInspectionAgency: this.otherInspectorEnabled ? this.new_inspector_agency : null,
      items: this.combinedItems.map(row => ({
        description:   row.description,
        qty:           row.currentQty,      // or qtyOrdered – depends on backend
        acceptedQty:   row.acceptedQty,
        rejectedQty:   row.rejectedQty,
        serialNo:      row.serialNo,
        verified:      row.verified,
        remarks:       row.remarks
      }))
    };

    this.http.post(`${environment.apiBaseUrl}/api/inspection/save`, payload,
      { headers: this.getDbHeaders() }
    ).subscribe({
      next: () => alert('Inspection saved!'),
      error: err => { console.error(err); alert('Save failed'); }
    });
  }

  }
