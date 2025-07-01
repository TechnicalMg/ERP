import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface InspectedItem {
  name: string;
  qty: number;
}

interface FinalDeliveryPO {
  poNumber: string;
  inspectedItems: InspectedItem[];
}
@Component({
  selector: 'app-final-delivery',
  imports: [CommonModule,FormsModule],
  templateUrl: './final-delivery.component.html',
  styleUrl: './final-delivery.component.css'
})
export class FinalDeliveryComponent {
 poDataList: FinalDeliveryPO[] = [
    {
      poNumber: 'PO123',
      inspectedItems: [
        { name: 'Item A', qty: 10 },
        { name: 'Item B', qty: 5 }
      ]
    },
    {
      poNumber: 'PO456',
      inspectedItems: [
        { name: 'Item X', qty: 4 },
        { name: 'Item Y', qty: 3 }
      ]
    }
  ];

  deliveryMethods = ['By Hand', 'Courier', 'Self Pickup', 'Logistics'];
  selectedPoNumber: string = '';
  inspectedItems: InspectedItem[] = [];
  selectedDeliveryMethod: string = '';
  actualDeliveryDate: Date | null = null;
  uploadedDocs: File[] = [];

  onPoSelect(poNum: string) {
    const po = this.poDataList.find(p => p.poNumber === poNum);
    this.inspectedItems = po ? po.inspectedItems.map(i => ({ ...i })) : [];
  }

  onDocUpload(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedDocs.push(files[i]);
    }
  }
}
