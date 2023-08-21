import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginOptionsDialogComponent } from '../login-options-dialog/login-options-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public showPassword: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (this.showPassword) {
      this.renderer.setAttribute(passwordInput, 'type', 'text');
    } else {
      this.renderer.setAttribute(passwordInput, 'type', 'password');
    }
  }

  Signin(signupForm: NgForm) {
    const email = signupForm.value.email;
    const password = signupForm.value.password;
    const emailPattern = /^.+@.+\..+$/;
    if (!signupForm.valid) {
      alert('Invalid form submission');
    }
    if (signupForm.valid && emailPattern.test(email)) {
      alert('Signin successful!');
      this.router.navigate(['home']);
    } else {
      if (!emailPattern.test(email)) {
        alert('Invalid email format');
        return;
      }

    }
  }

  openLoginOptionsDialog(): void {
    const dialogRef = this.dialog.open(LoginOptionsDialogComponent, {
      width: '300px',
      panelClass: 'login-options-dialog'
    });
  }

}
