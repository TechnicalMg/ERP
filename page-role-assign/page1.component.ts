import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@Component({
  selector: 'app-page1',
  imports: [CommonModule,FormsModule,MatFormFieldModule, MatSelectModule,MatInputModule, MatAutocompleteModule],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css'
})
export class Page1Component {
  users = [
    { id: 1, userName: 'saketh' },
    { id: 2, userName: 'likith' },
    { id: 3, userName: 'sarvani' },
    { id: 4, userName: 'jd' },
    { id: 5, userName: 'sachin' },
    { id: 6, userName: 'mahi' },
    { id: 7, userName: 'bharat' }
  ];

  filteredUsers = [...this.users];  // Initially, all users are visible
  userFilter: string = '';
  selectedUserId: number | null = null;

onUserSelect(userName: string) {
  const user = this.users.find(u => u.userName === userName);
  if (user) {
    this.selectedUserId = user.id;
    console.log('Selected user ID:', this.selectedUserId);
  }
}

  filterUsers() {
    const filterValue = this.userFilter.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.userName.toLowerCase().includes(filterValue)
    );
  }
}
