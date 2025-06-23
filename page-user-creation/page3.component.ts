import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-page3',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.css'
})
export class Page3Component {
 userForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isTypingPassword = false;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  onPasswordInput() {
    const passwordValue = this.userForm.get('password')?.value || '';
    this.isTypingPassword = passwordValue.length > 0;
  }
  onSave() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      alert('User saved successfully!');
      // Here you can add API call logic
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
