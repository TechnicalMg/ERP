import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
  
@Component({
  selector: 'app-admin-user-login-dashboard',
  imports: [],
  templateUrl: './admin-user-login-dashboard.component.html',
  styleUrl: './admin-user-login-dashboard.component.css'
})
export class AdminUserLoginDashboardComponent  implements OnInit  {

  menus: any[] = [];
  userName = '';

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      const parsed = JSON.parse(userData);
      this.userName = parsed.user.userName;
      this.menus = parsed.userMenus;
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    location.reload();
  }
}
