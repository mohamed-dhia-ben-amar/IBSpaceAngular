import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public showPassword: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private router: Router
  ) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (this.showPassword) {
      this.renderer.setAttribute(passwordInput, 'type', 'text');
    } else {
      this.renderer.setAttribute(passwordInput, 'type', 'password');
    }
  }

  Signup(signupForm: NgForm) {
    const email = signupForm.value.email;
    const password = signupForm.value.password;
    const emailPattern = /^.+@.+\..+$/;
    if (!signupForm.valid) {
      alert('Invalid form submission');
    }
    if (signupForm.valid && emailPattern.test(email)) {
      alert('Signup successful!');
      this.router.navigate(['login']);
    } else {
      if (!emailPattern.test(email)) {
        alert('Invalid email format');
        return;
      }

    }
  }
}