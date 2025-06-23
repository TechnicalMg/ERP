import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { DashboardMenu } from '../../models/dashboard-menu';
import { AssignmentService } from '../../services/assignment.service';
import { AssignmentDTO } from '../../models/assignment-dto';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-assign-dashboard',
  imports: [CommonModule,FormsModule,MatIconModule],
  templateUrl: './assign-dashboard.component.html',
  styleUrl: './assign-dashboard.component.css'
})
export class AssignDashboardComponent  implements OnInit {
  // users: User[] = [];
  users:any[]=[];
  menus: DashboardMenu[] = [];
  selectedUserId: number | null = null;
  selectedDashboardMenuIds: number[] = [];

  userMenus: any[] = [];
  assignedMenuIds: number[] = [];

  // You can set menuId to a default/fixed value or fetch if needed
  selectedMenuId = 1;
  constructor(private service: AssignmentService,private http: HttpClient) {}

  
  ngOnInit(): void {
    // this.service.getUsers().subscribe(users => this.users = users);
    // this.service.getDashboardMenus().subscribe(menus => this.menus = menus);


    // this.getUserMenus();
    const dbName = sessionStorage.getItem('dbName');
    const userEmail = sessionStorage.getItem('userEmail');
  console.log("userMenu page",dbName);
  console.log(userEmail);
    const userType = sessionStorage.getItem('userType');
this.getUsers();
// this.service.getDashboardMenus().subscribe(menus => this.menus = menus);
this.getDashboardMenus();
this.getUserMenus();
// this.getUsers();
// this.loadMenus();
  }

//   loadMenus() {
//   this.service.getDashboardMenus().subscribe(menus => this.menus = menus);
// }

  getDbHeaders(): HttpHeaders {
    const dbName = sessionStorage.getItem('dbName');
    console.log("dbheaders",dbName);
    return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
  }

  getUserMenus() {
   
  this.http.get<any[]>(`${environment.apiBaseUrl}/api/usermenu/all`, {
    headers: this.getDbHeaders(),
  }).subscribe({
    next: (data) => {this.userMenus = data
      console.log("user menus",this.userMenus);
    },
    error: () => alert('Error fetching user menus')
  });
}
  getUsers() {
      this.http.get<any>(environment.apiBaseUrl+'/api/user-menu-dashboard-assignment/users', {
        headers: this.getDbHeaders()
      }).subscribe({
        // next: (data) => this.users = data,
        next: (data) => {
          this.users = data,
          console.log("getting response data",this.users);
        },
        error: (err) => alert('Failed to fetch users')
      });
    }

    // return this.http.get<DashboardMenu[]>(`${this.baseUrl}/dashboard-menus`);

     getDashboardMenus() {

      // this.http.get<any>(environment.apiBaseUrl+'/api/user-menu-dashboard-assignment/users', {
      this.http.get<DashboardMenu[]>(`${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/dashboard-menus`,{
        headers: this.getDbHeaders()
      }).subscribe({
        // next: (data) => this.users = data,
        next: (data) => {
          this.menus = data,
          console.log("getting response data",this.users);
          console.log("getting response data menus",this.menus);

        },
        error: (err) => alert('Failed to fetch users')
      });
    }


  toggleDashboardSelection(menuId: number) {
    const idx = this.selectedDashboardMenuIds.indexOf(menuId);
    if (idx > -1) {
      this.selectedDashboardMenuIds.splice(idx, 1);
    } else {
      this.selectedDashboardMenuIds.push(menuId);
    }
  }

  assign() {
    if (!this.selectedUserId) {
      alert('Please select a user.');
      return;
    }

    const dto: AssignmentDTO = {
      userId: this.selectedUserId,
      menuId: this.selectedMenuId,
      dashboardMenuIds: this.selectedDashboardMenuIds,
    };

  
    this.http.post(`${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/assign`, dto, {
      headers: this.getDbHeaders()
    }).subscribe({
      next: () => {
      alert('Assignment saved successfully!');
      this.selectedDashboardMenuIds = [];
        // reload list after save
      },
      error: (err) => alert('Error saving menu: ' + err.message),
    });


  }

 checkAll() {
    this.selectedDashboardMenuIds = this.menus.map((m) => m.id);
  }

  uncheckAll() {
    this.selectedDashboardMenuIds = [];
  }

  deleteAssignments() {
    if (!this.selectedUserId) {
      alert('Select a user');
      return;
    }

    this.http
      .delete(
        `${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/delete/${this.selectedUserId}/${this.selectedMenuId}`,
        { headers: this.getDbHeaders() }
      )
      .subscribe({
        next: () => {
          alert('Assignments deleted');
          this.selectedDashboardMenuIds = [];
        },
        error: (err) => alert('Error deleting: ' + err.message),
      });
  }

  onUserSelect(userId: number) {
  this.selectedUserId = userId;
  this.fetchAssignedMenusForUser(userId);
}

fetchAssignedMenusForUser(userId: number) {
  this.http.get<number[]>(`${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/assigned-dashboard-menu-ids/${userId}`, {
    headers: this.getDbHeaders()
  }).subscribe({
    next: (assignedMenuIds) => {
      this.selectedDashboardMenuIds = assignedMenuIds || [];
      console.log("Assigned menu IDs:", this.selectedDashboardMenuIds);
    },
    error: (err) => alert('Failed to fetch assigned menus: ' + err.message)
  });
}

// For pre-filling existing assignments
dashboards: DashboardMenu[] = [];
assignmentsMap: { [userMenuId: number]: number[] } = {};
loadAssignments() {
  this.http.get<any>(`${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/all-assignments`, {
    headers: this.getDbHeaders(),
  }).subscribe({
    next: (data) => {
      this.assignmentsMap = data; // { userMenuId: [dashboardId1, dashboardId2, ...] }
    },
    error: () => alert('Error loading assignments')
  });
}

toggleDashboardForUserMenu(userMenuId: number, dashboardId: number) {
  if (!this.assignmentsMap[userMenuId]) {
    this.assignmentsMap[userMenuId] = [];
  }

  const index = this.assignmentsMap[userMenuId].indexOf(dashboardId);
  if (index === -1) {
    this.assignmentsMap[userMenuId].push(dashboardId);
  } else {
    this.assignmentsMap[userMenuId].splice(index, 1);
  }
}

isDashboardSelected(userMenuId: number, dashboardId: number): boolean {
  return this.assignmentsMap[userMenuId]?.includes(dashboardId) || false;
}

saveAssignments() {
  const payload = [];

  for (const userMenuId in this.assignmentsMap) {
    payload.push({
      menuId: +userMenuId,
      dashboardMenuId: this.assignmentsMap[userMenuId],
    });
  }

  console.log("payload",payload);
// this.http.post(`${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/assign`, dto, {
  this.http.post(`${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/assign-menus`, payload, {
    headers: this.getDbHeaders(),
  }).subscribe({
    next: () => alert('Assignments saved successfully!'),
    error: () => alert('Error saving assignments'),
  });





  // if (!this.selectedUserId) {
  //     alert('Please select a user.');
  //     return;
  //   }

    // const dto: AssignmentDTO = {
    //   // userId: this.selectedUserId,
    //   userId: 0,
    //   menuId: this.selectedMenuId,
    //   dashboardMenuIds: this.selectedDashboardMenuIds,
    // };

    // console.log("dto on saving",dto);
  
    // this.http.post(`${environment.apiBaseUrl}/api/user-menu-dashboard-assignment/assign`, dto, {
    //   headers: this.getDbHeaders()
    // }).subscribe({
    //   next: () => {
    //   alert('Assignment saved successfully!');
    //   this.selectedDashboardMenuIds = [];
    //     // reload list after save
    //   },
    //   error: (err) => alert('Error saving menu: ' + err.message),
    // });


}



}
