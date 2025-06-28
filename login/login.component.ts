import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userForm!: FormGroup;
  isTypingPassword = false;
  showPassword = false;
  captcha: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      captchaInput: ['', Validators.required]
    });
  }

  onPasswordInput(): void {
    const passwordValue = this.userForm.get('password')?.value || '';
    this.isTypingPassword = passwordValue.length > 0;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const loginData = this.userForm.value;
      console.log('Login submitted:', loginData);

      // ✅ Add login logic here (e.g., call authentication service)
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
  generateCaptcha(): void {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  this.captcha = Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
}
}
