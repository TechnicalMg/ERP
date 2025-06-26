import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-user-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-login.component.html',
  styleUrl: './admin-user-login.component.css'
})
export class AdminUserLoginComponent {




userEmail: string = '';
password: string = '';
constructor(private http: HttpClient, private router: Router) {}


login()
 {
  const payload = {
    userEmail: this.userEmail,
    password: this.password
  };



  // this.http.post<any>(environment.apiBaseUrl+'/api/user-management/login', payload)
  this.http.post<any>(environment.apiBaseUrl+'/api/user-management/login', payload, {
    withCredentials: true   // ✅ This ensures the session cookie is sent and maintained
  })
    .subscribe({
      next: (response) => {
        // alert(response.message);

        sessionStorage.setItem('dbName', response.dbName);
        sessionStorage.setItem('userType', response.userType);
        // sessionStorage.setItem('userEmail', this.userEmail);
        sessionStorage.setItem('userEmail', response.userEmail);
        sessionStorage.setItem('companyName', response.companyName);
        sessionStorage.setItem('companyId', response.companyId);
        sessionStorage.setItem('userName', response.userName);

        console.log("response.dbName",response.dbName); 
        console.log("response.userType",response.userType); 
        console.log("response.email",this.userEmail); 
        
        console.log("response.userCompanyName",response.companyName);
        console.log("response.userCompanyId",response.companyId);
        console.log("response.userName",response.userName);

        // console.log("Full Response",response);


  //        this.http.post<any>(environment.apiBaseUrl+'/api/user-management/login', payload, {
  //   withCredentials: true   // ✅ This ensures the session cookie is sent and maintained
  // })
  //   .subscribe({
  //     next: (response1) => {
  //       sessionStorage.setItem('userId', response1.dbName);
  //     },
  //     error: (error) => {
  //       alert(error.error.message || 'Something went wrong');
  //     }
  //   });


        if (response.userType === 'Admin') {
          this.router.navigate(['/dashboard-admin/admin-dashboard-home']);
        } else if (response.userType === 'User') {
          this.router.navigate(['/dashboard-user']);
        }
      },
      error: (error) => {
        alert(error.error.message || 'Something went wrong');
      }
    });




}

forgotPassword() {
          alert('Contact your admin/superAdmin...');
          // this.router.navigate(['/forgot-password']);
        }

}
