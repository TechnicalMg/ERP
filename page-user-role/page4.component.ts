import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page4',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.css'
})
export class Page4Component {

  newRole: string = '';
  roles: string[] = ['Admin', 'Editor', 'Viewer'];

  addRole() {
    if (this.newRole.trim()) {
      this.roles.push(this.newRole.trim());
      this.newRole = '';
    } else {
      alert('Please enter a valid role name');
    }
  }

  deleteRole(index: number) {
    this.roles.splice(index, 1);
  }
}
