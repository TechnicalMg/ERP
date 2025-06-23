import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../../environments/environment';
@Component({
  selector: 'app-create-user',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  user: any = {
    userName: '',
    designation: '',
    phoneCode: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    email:''
  };


  phoneCodes: string[] = [];
  passwordError = '';

  
  currentPassword = '';
  showChangePassword = true;


  dbName ='';
  userName = '';
  userType = '';
  companyId = '';
  companyName = '';
  userEmail='';
  mainDb='ignitia_db';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPhoneCodes();
    const dbName = sessionStorage.getItem('dbName');
      const userEmail = sessionStorage.getItem('userEmail');
      const userCompanyName = sessionStorage.getItem('companyName');
      const userCompanyId = sessionStorage.getItem('companyId');




    console.log("userMenu page",dbName);
    console.log(userEmail);
    console.log("company name",userCompanyName);
    console.log("company id",userCompanyId);
    // console.log(userEmail);



      const userType = sessionStorage.getItem('userType');
  }
   // ✅ Helper to get headers with dbName
   getDbHeaders(): HttpHeaders {

    const dbName = sessionStorage.getItem('dbName');
    const userName = sessionStorage.getItem('dbName');
    const userType = sessionStorage.getItem('userType');
    const companyId = sessionStorage.getItem('companyId');
    const companyName = sessionStorage.getItem('companyName');
    const userEmail = sessionStorage.getItem('userEmail');

    // const dbName = sessionStorage.getItem('dbName');
    // const companyId = sessionStorage.getItem('companyId') ?? '';
    // const companyName = sessionStorage.getItem('companyName') ?? '';
    console.log("dbheaders",dbName);
    // return new HttpHeaders({ 'X-DB-Name': dbName ?? '' });
    return new HttpHeaders({
      'X-DB-Name': dbName ?? '',
      'X-Company-Id': companyId ?? '',
      'X-Company-Name': companyName ?? '',
      'X-User-Email': userEmail ?? '',
      'X-User-Name': userName ?? '',
      'X-User-Type': userType ?? '',

    });
// return new HttpHeaders()
// .set('X-DB-Name', this.dbName)
// .set('X-Company-Id', this.companyId)
// .set('X-Company-Name', this.companyName)
// .set('X-User-Email', this.userEmail)
// .set('X-User-Name', this.userName)
// .set('X-User-Type', this.userType);


  }


  fetchPhoneCodes() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe((data) => {
      this.phoneCodes = data
        .map(c => c.idd?.root + (c.idd?.suffixes ? c.idd.suffixes[0] : ''))
        .filter(code => !!code);
    });
  }
  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;

    // Clear password fields if cancelled
    if (!this.showChangePassword) {
      this.user.password = '';
      this.user.confirmPassword = '';
      this.passwordError = '';
    }
  }
  validatePassword() {
    const { password } = this.user;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    this.passwordError = regex.test(password) ? '' : 'Invalid password format.';
  }

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.passwordError) {
      alert('Fix password error before submitting');
      return;
    }

    // this.http.post('http://localhost:8080/api/users/create', this.user).subscribe({
    // this.http.post(environment.apiBaseUrl+'/api/users/create', this.user).subscribe({
      this.http.post(`${environment.apiBaseUrl}/api/users/create`, this.user, {
        headers: this.getDbHeaders()
      }).subscribe({
      next: (res) => {alert('User Created!')
        this.user = {
          userName: '',
          designation: '',
          phoneCode: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          email: ''
        };
        this.passwordError = '';
       },
      error: (err) => alert('Error: ' + err.message)
    });
  }
}
