import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="popup-container">
      <div class="popup-content">
        <h1 mat-dialog-title class="dialog-title">Confirmation</h1>
        <div mat-dialog-content class="dialog-content">
          <p>{{ data.message }}</p>
        </div>
        <div mat-dialog-actions class="dialog-actions">
          <button mat-button class="cancel-button" (click)="onNoClick()">Cancel</button>
          <button mat-button class="ok-button" color="primary" mat-dialog-close (click)="onYesClick()">OK</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('ok');
  }

}
