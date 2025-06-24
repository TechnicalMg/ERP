import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page2',
  imports: [CommonModule, FormsModule],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css'
})
export class Page2Component {
  menus = [
    {
      menuName: 'Menu A',
      open: false,
      selectAll: false,
      options: [
        { name: 'Option 1', checked: false },
        { name: 'Option 2', checked: false },
        { name: 'Option 3', checked: false },
        { name: 'Option 4', checked: false },
        { name: 'Option 5', checked: false },
        { name: 'Option 6', checked: false },
        { name: 'Option 7', checked: false },
        { name: 'Option 8', checked: false },
        { name: 'Option 9', checked: false },
        { name: 'Option 10', checked: false }
      ]
    },
    {
      menuName: 'Menu B',
      open: false,
      selectAll: false,
      options: [
        { name: 'Option 1', checked: false },
        { name: 'Option 2', checked: false },
        { name: 'Option 3', checked: false }
      ]
    },
    {
      menuName: 'Menu C',
      open: false,
      selectAll: false,
      options: [
        { name: 'Option 1', checked: false },
        { name: 'Option 2', checked: false },
        { name: 'Option 3', checked: false }
      ]
    }
  ];

  toggleDropdown(index: number) {
    this.menus[index].open = !this.menus[index].open;
  }

  toggleSelectAll(menuIndex: number, checked: boolean) {
    const menu = this.menus[menuIndex];
    menu.selectAll = checked;
    menu.options.forEach(opt => opt.checked = checked);
  }

  onOptionChange(menuIndex: number) {
    const menu = this.menus[menuIndex];
    const allSelected = menu.options.every(opt => opt.checked);
    menu.selectAll = allSelected;
  }

  applyMenuSelection(i: number) {
  console.log('Apply clicked for: ${i}', this.menus[i]);
  // You can add any further logic you need here
}

hasAnySelections(): boolean {
  return this.menus.some(menu => 
    menu.options.some(option => option.checked)
  );
}

applyAllSelections(): void {
  // Apply logic for all menus with selections
  this.menus.forEach((menu, index) => {
    if (menu.options.some(option => option.checked)) {
      this.applyMenuSelection(index);
    }
  });
}
}
