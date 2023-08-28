import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  VerifMailForm: FormGroup;
  email = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.VerifMailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    /*
    this.email = this.route.snapshot.params['email'];
    this.VerifMailForm.patchValue({
      email: this.email
    });
    */
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const email = form.value.email;
      // Handle form submission with the email value
      this.authService.ForgotPassword(email);
    }
  }

}

