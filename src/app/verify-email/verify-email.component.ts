import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
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
    this.email = this.route.snapshot.params['email'];
    this.VerifMailForm.patchValue({
      email: this.email
    });
  }

  submit() {
    // Handle form submission if needed
    this.authService.ForgotPassword(this.email)
  }
}