import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public showPassword: boolean = false;

  signUpForm = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  );

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get username() {
    return this.signUpForm.get('username');
  }

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService,
    private fb: NonNullableFormBuilder
  ) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const ConfirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    if (this.showPassword) {
      this.renderer.setAttribute(passwordInput, 'type', 'text');
      this.renderer.setAttribute(ConfirmPasswordInput, 'type', 'text');
    } else {
      this.renderer.setAttribute(passwordInput, 'type', 'password');
      this.renderer.setAttribute(ConfirmPasswordInput, 'type', 'password');
    }
  }

  submit() {

    if (!this.signUpForm.valid) return;

    const { username, email, password } = this.signUpForm.value;

    this.authService.signUp(username!, email!, password!).subscribe(() => {
      this.router.navigate(['login']);
    })

  }
  
}

function passwordsMatchValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
