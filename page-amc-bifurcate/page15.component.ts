import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page15',
  imports: [CommonModule,FormsModule],
  templateUrl: './page15.component.html',
  styleUrl: './page15.component.css'
})
export class Page15Component {

  roles: string[] = ['Admin', 'Editor', 'Viewer'];
  
    deleteRole(index: number) {
    this.roles.splice(index, 1);
  }
}
