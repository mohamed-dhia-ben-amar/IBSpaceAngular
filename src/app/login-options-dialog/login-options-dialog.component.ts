import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-options-dialog',
  templateUrl: './login-options-dialog.component.html',
  styleUrls: ['./login-options-dialog.component.css']
})
export class LoginOptionsDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginOptionsDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  loginWithGoogle(): void {
    // Handle login with Google
  }

  loginWithFacebook(): void {
    // Handle login with Facebook
  }
}