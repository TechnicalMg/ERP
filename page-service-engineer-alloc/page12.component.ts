import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page12',
  imports: [FormsModule],
  templateUrl: './page12.component.html',
  styleUrl: './page12.component.css'
})
export class Page12Component {

  engineerDetails = {
  name: '',
  number: '',
  eta: ''
  };

  openDateTimePicker(event: Event) {
    const input = event.target as HTMLInputElement;
    // Trick to ensure picker opens regardless of where user clicks
    input.showPicker?.(); // ✅ Chrome & modern browsers
    // fallback (for browsers without showPicker)
    input.focus();
  }
}
