import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface DeliveredItem {
  name: string;
  qty: number;
}

@Component({
  selector: 'app-final-acknowledgement',
  imports: [CommonModule,FormsModule
  ],
  templateUrl: './final-acknowledgement.component.html',
  styleUrl: './final-acknowledgement.component.css'
})
export class FinalAcknowledgementComponent {
 poList = [
    {
      poNumber: 'PO123',
      items: [
        { name: 'Item A', qty: 10 },
        { name: 'Item B', qty: 5 }
      ]
    },
    {
      poNumber: 'PO456',
      items: [
        { name: 'Item X', qty: 2 },
        { name: 'Item Y', qty: 7 }
      ]
    }
  ];

  selectedPoNumber: string = '';
  selectedItems: DeliveredItem[] = [];

  uploadedFiles: File[] = [];

  onPoSelect(poNum: string) {
    const po = this.poList.find(p => p.poNumber === poNum);
    this.selectedItems = po ? po.items.map(i => ({ ...i })) : [];
  }

  onFileUpload(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }

  markAsDelivered() {
    alert('PO marked as delivered and acknowledged!');
    // Further logic can be added here
  }
}
