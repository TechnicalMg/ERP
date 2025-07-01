import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface DeliveryItem {
  name: string;
  qty: number;
  checked: boolean;
}

interface DeliveryPoData {
  poNumber: string;
  items: DeliveryItem[];
}

@Component({
  selector: 'app-delivery-ways',
  imports: [CommonModule,
    FormsModule],
  templateUrl: './delivery-ways.component.html',
  styleUrl: './delivery-ways.component.css'
})
export class DeliveryWaysComponent {
 poDataList: DeliveryPoData[] = [
    {
      poNumber: 'PO123',
      items: [
        { name: 'Item A', qty: 10, checked: false },
        { name: 'Item B', qty: 5, checked: true }
      ]
    },
    {
      poNumber: 'PO456',
      items: [
        { name: 'Item X', qty: 4, checked: false },
        { name: 'Item Y', qty: 3, checked: false }
      ]
    }
  ];

  selectedPoNumber: string = '';
  selectedItems: DeliveryItem[] = [];
  unselectedItems: DeliveryItem[] = [];

  onPoSelect(poNumber: string) {
    const selectedPo = this.poDataList.find(po => po.poNumber === poNumber);
    if (selectedPo) {
      this.selectedItems = selectedPo.items.filter(i => i.checked);
      this.unselectedItems = selectedPo.items.filter(i => !i.checked);
    } else {
      this.selectedItems = [];
      this.unselectedItems = [];
    }
  }
}
