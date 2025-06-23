import { Component , OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-manage-user-menu',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgSelectModule],
  templateUrl: './manage-user-menu.component.html',
  styleUrl: './manage-user-menu.component.css'
})
export class ManageUserMenuComponent implements OnInit {


  // users: any[] = [];
  // userMenus: any[] = [];
  // selectedUserId: number | null = null;
  // assignedMenuIds: number[] = [];

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.getUsers();
  //   this.getUserMenus();
  // }

  // getUsers() {
  //   this.http.get<any[]>('http://localhost:8080/api/users/all').subscribe({
  //     next: (data) => this.users = data,
  //     error: (err) => alert('Failed to fetch users')
  //   });
  // }

  // getUserMenus() {
  //   this.http.get<any[]>('http://localhost:8080/api/usermenu/all').subscribe({
  //     next: (data) => this.userMenus = data,
  //     error: (err) => alert('Failed to fetch menus')
  //   });
  // }

  // onUserSelect() {
  //   if (!this.selectedUserId) return;
  //   // this.http.get<number[]>(`http://localhost:8080/api/usermenuassignment/user/${this.selectedUserId}`).subscribe({

  //   //   next: (data) => this.assignedMenuIds = data,
  //   //   error: (err) => alert('Failed to fetch assigned menus')
  //   // });
  
  //   this.http.get<any>(`http://localhost:8080/api/usermenuassignment/get/${this.selectedUserId}`).subscribe({
  //     next: (response) => this.assignedMenuIds = response.data,
  //     error: (err) => alert('Failed to fetch assigned menus')
  //   });
  
  
  // }

  // isChecked(menuId: number): boolean {
  //   return this.assignedMenuIds.includes(menuId);
  // }

  // toggleMenu(menuId: number) {
  //   const index = this.assignedMenuIds.indexOf(menuId);
  //   if (index > -1) {
  //     this.assignedMenuIds.splice(index, 1);
  //   } else {
  //     this.assignedMenuIds.push(menuId);
  //   }
  // }

  // updateAssignments() {
  //   if (!this.selectedUserId) return;

  //   const payload = {
  //     userId: this.selectedUserId,
  //     menuIds: this.assignedMenuIds
  //   };

  //   // this.http.post('http://localhost:8080/api/usermenuassignment/assign', payload).subscribe({
  //   //   next: () => alert('Assignments updated successfully!'),
  //   //   error: (err) => alert('Update failed')
  //   // });


  //   this.http.post(
  //     `http://localhost:8080/api/usermenuassignment/assign/${this.selectedUserId}`,
  //     this.assignedMenuIds
  //   ).subscribe({
  //     next: () => alert('Assignments updated successfully!'),
  //     error: (err) => alert('Update failed: ' + err.message)
  //   });
  // }

  // deleteAllAssignments() {
  //   if (!this.selectedUserId) return;

  //   if (confirm('Are you sure you want to delete all assignments for this user?')) {
  //     // this.http.delete(`http://localhost:8080/api/usermenuassignment/user/${this.selectedUserId}`).subscribe({
  //     //   next: () => {
  //     //     alert('All assignments deleted');
  //     //     this.assignedMenuIds = [];
  //     //   },
  //     //   error: (err) => alert('Delete failed')
  //     // });

  //     this.http.delete(`http://localhost:8080/api/usermenuassignment/clear/${this.selectedUserId}`).subscribe({
  //       next: () => {
  //         alert('All assignments deleted');
  //         this.assignedMenuIds = [];
  //       },
  //       error: (err) => alert('Delete failed: ' + err.message)
  //     });

  //   }
  // }

  users: any[] = [];
  userMenus: any[] = [];
  selectedUserId: number | null = null;
  assignedMenuIds: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
    this.getUserMenus();
    const dbName = sessionStorage.getItem('dbName');
    const userEmail = sessionStorage.getItem('userEmail');
  console.log("userMenu page",dbName);
  console.log(userEmail);
    const userType = sessionStorage.getItem('userType');
  }

  
  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaders",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }
  
  // getUsers() {
  //   // this.http.get<any[]>('http://localhost:8080/api/users/all').subscribe({
    
  //   // this.http.get<any[]>(environment.apiBaseUrl+'/api/users/all').subscribe({
  //   this.http.get<any>(environment.apiBaseUrl+'/api/users/all', {
  //     headers: this.getDbHeaders()
  //   }).subscribe({
  //     next: response => {
  //       this.users = response.data || [];
  //     },
  //     // next: (data) => this.users = data,
  //     error: (err) => alert('Failed to fetch users')
  //   });
  // }


  getUsers() {
    this.http.get<any>(environment.apiBaseUrl+'/api/users/all', {
      headers: this.getDbHeaders()
    }).subscribe({
      // next: (data) => this.users = data,
      next: response => {
        this.users = response.data || [];
      },
      error: (err) => alert('Failed to fetch users')
    });
  }



  // getUserMenus() {
  //   // this.http.get<any[]>('http://localhost:8080/api/usermenu/all').subscribe({
  //   // this.http.get<any[]>(   environment.apiBaseUrl+'/api/usermenu/all').subscribe({
  //   this.http.get<any>(environment.apiBaseUrl+'/api/usermenu/all', {
  //     headers: this.getDbHeaders()
  //   }).subscribe({
      
  //     next: (response) => this.userMenus = response.data || [],
  //     error: (err) => alert('Failed to fetch menus')
  //   });
  //   console.log("getUserMenus",this.userMenus);
  // }



  getUserMenus() {
    // this.http.get<any[]>('http://localhost:8080/api/usermenu/all').subscribe({
    this.http.get<any[]>(   environment.apiBaseUrl+'/api/usermenu/all', {
      headers: this.getDbHeaders()
    }).subscribe({
      next: (data) => this.userMenus = data,
      error: (err) => alert('Failed to fetch menus')
    });
  }



  // onUserSelect() {
  //   if (!this.selectedUserId) return;

  //   // this.http.get<any>(`http://localhost:8080/api/usermenuassignment/get/${this.selectedUserId}`).subscribe({
  //   // this.http.get<any>(  environment.apiBaseUrl+`/api/usermenuassignment/get/${this.selectedUserId}`).subscribe({
  //   this.http.get<any>(  environment.apiBaseUrl+`/api/usermenuassignment/get/${this.selectedUserId}`, {
  //     headers: this.getDbHeaders()
  //   }).subscribe({
  //     next: (response) => {
  //       console.log("onUserSelect",response);
  //       this.assignedMenuIds = response.data || [];
  //     },
  //     error: (err) => alert('Failed to fetch assigned menus: ' + err.message)
  //   });
  // }


  onUserSelect() {
    if (!this.selectedUserId) return;

    // this.http.get<any>(`http://localhost:8080/api/usermenuassignment/get/${this.selectedUserId}`).subscribe({
    this.http.get<any>(  environment.apiBaseUrl+`/api/usermenuassignment/get/${this.selectedUserId}`, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: (response) => {
        this.assignedMenuIds = response.data || [];
      },
      error: (err) => alert('Failed to fetch assigned menus: ' + err.message)
    });
  }

  isChecked(menuId: number): boolean {
    return this.assignedMenuIds.includes(menuId);
  }

  toggleMenu(menuId: number) {
    const index = this.assignedMenuIds.indexOf(menuId);
    if (index > -1) {
      this.assignedMenuIds.splice(index, 1);
    } else {
      this.assignedMenuIds.push(menuId);
    }
  }

  // updateAssignments() {
  //   if (!this.selectedUserId) return;

  //   this.http.post(
  //     `http://localhost:8080/api/usermenuassignment/assign/${this.selectedUserId}`,
  //     this.assignedMenuIds
  //   ).subscribe({
  //     next: () => alert('Assignments updated successfully!'),
  //     error: (err) => alert('Update failed: ' + err.message)
  //   });
  // }

  // NEW UPDATE ASSIGNMENT FUNCTION

  updateAssignments() {
    if (this.selectedUserId && this.assignedMenuIds.length > 0) {

      console.log("Selected roles id",this.assignedMenuIds);
      console.log("Selected User ID:", this.selectedUserId);
      // this.http.put(`http://localhost:8080/api/usermenuassignment/update/${this.selectedUserId}`, this.assignedMenuIds)
      // this.http.put( environment.apiBaseUrl+`/api/usermenuassignment/update/${this.selectedUserId}`, this.assignedMenuIds)
      this.http.put( environment.apiBaseUrl+`/api/usermenuassignment/update/${this.selectedUserId}`, this.assignedMenuIds, {
        headers: this.getDbHeaders()
      }).subscribe({
          next: (res) => {
            alert('Roles assigned successfully!');
            console.log('Update successful', res);
            this.getAssignments();
          },
          error: (err) => {
            alert('Roles assigned failed!');
            console.error('Update failed', err);
          }
        });
    } else {
      alert('Please select at least one menu');
    }
  }

  getAssignments(): void {
    // this.http.get(`http://localhost:8080/api/usermenuassignment/get/${this.selectedUserId}`).subscribe({
    // this.http.get(environment.apiBaseUrl+`/api/usermenuassignment/get/${this.selectedUserId}`).subscribe({
    this.http.get(environment.apiBaseUrl+`/api/usermenuassignment/get/${this.selectedUserId}`, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: (res: any) => {
        this.assignedMenuIds = res.data;  // assuming res.data is list of menu IDs
      },
      error: (err) => {
        console.error('Error fetching assigned menus', err);
      }
    });
  }


  deleteAllAssignments() {
    if (!this.selectedUserId) return;

    if (confirm('Are you sure you want to delete all assignments for this user?')) {
      // this.http.delete(`http://localhost:8080/api/usermenuassignment/clear/${this.selectedUserId}`).subscribe({
      // this.http.delete( environment.apiBaseUrl+`/api/usermenuassignment/clear/${this.selectedUserId}`).subscribe({
      this.http.delete( environment.apiBaseUrl+`/api/usermenuassignment/clear/${this.selectedUserId}`, {
        headers: this.getDbHeaders()
      }).subscribe({
        next: () => {
          alert('All assignments deleted');
          this.assignedMenuIds = [];
        },
        error: (err) => alert('Delete failed: ' + err.message)
      });
    }
  }

  selectAllMenus() {
    this.assignedMenuIds = this.userMenus.map(menu => menu.id);
  }
  
  deselectAllMenus() {
    this.assignedMenuIds = [];
  }
}
