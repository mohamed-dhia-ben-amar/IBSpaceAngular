import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login-options-dialog',
  templateUrl: './login-options-dialog.component.html',
  styleUrls: ['./login-options-dialog.component.css']
})
export class LoginOptionsDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginOptionsDialogComponent>, private authService: AuthenticationService) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  loginWithGoogle(): void {
    // Handle login with Google
    this.authService.GoogleSignIn()
    this.closeDialog()
  }

  loginWithFacebook(): void {
    // Handle login with Facebook
    //this.authService.FaceBookSignIn()
    //this.closeDialog()
  }
}