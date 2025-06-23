import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../../environments/environment';
@Component({
  selector: 'app-create-user-menu',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-user-menu.component.html',
  styleUrl: './create-user-menu.component.css'
})
export class CreateUserMenuComponent implements OnInit {


  userMenuText: string = '';
  userMenus: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserMenus()
    const dbName = sessionStorage.getItem('dbName');
      const userEmail = sessionStorage.getItem('userEmail');
    console.log("userMenu page",dbName);
    console.log(userEmail);
      const userType = sessionStorage.getItem('userType');
      
    }



    // ✅ Helper to get headers with dbName
  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaders",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }


   // ✅ Load all user menus from selected DB
   loadUserMenus() {
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/usermenu/all`, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: (data) => this.userMenus = data,
      error: (err) => alert('Error loading menus: ' + err.message),
    });
  }




// previous working code for local hostload user menu from single db
  // loadUserMenus() {
  //   // this.http.get<any[]>('http://localhost:8080/api/usermenu/all').subscribe({
  //   this.http.get<any[]>(environment.apiBaseUrl+'/api/usermenu/all').subscribe({
  //     next: (data) => (this.userMenus = data),
  //     error: (err) => alert('Error loading menus: ' + err.message),
  //   });
  // }


// ✅ Save menu to selected DB
saveUserMenu() {
  if (!this.userMenuText.trim()) {
    alert('Menu name required');
    return;
  }

  const payload = { menuName: this.userMenuText };

  this.http.post(`${environment.apiBaseUrl}/api/usermenu/create`, payload, {
    headers: this.getDbHeaders()
  }).subscribe({
    next: () => {
      alert('UserMenu Saved');
      this.userMenuText = '';
      this.loadUserMenus(); // reload list after save
    },
    error: (err) => alert('Error saving menu: ' + err.message),
  });
}

deleteUserMenu(menuId: number) {
  if (!confirm('Do you want to delete this menu?')) {
    return;
  }

  this.http.delete(`${environment.apiBaseUrl}/api/usermenu/delete/${menuId}`, {
    headers: this.getDbHeaders()
  }).subscribe({
    next: () => {
      alert('Menu deleted successfully');
      this.loadUserMenus();
    },
    error: (err) => alert('Error deleting menu: ' + err.message)
  });
}



}


  // saveUserMenu() {
  //   if (!this.userMenuText.trim()) {
  //     alert('Menu name required');
  //     return;
  //   }

  //   const payload = { menuName: this.userMenuText };
  //   // this.http.post('http://localhost:8080/api/usermenu/create', payload).subscribe({
  //   this.http.post(environment.apiBaseUrl+'/api/usermenu/create', payload).subscribe({
  //     next: () => {
  //       alert('UserMenu Saved');
  //       this.userMenuText = '';
  //       this.loadUserMenus();
  //     },
  //     error: (err) => alert('Error saving menu: ' + err.message),
  //   });
  // }

