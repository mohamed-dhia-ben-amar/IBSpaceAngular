import { Component } from '@angular/core';
import { FlagListDialogComponent } from '../flag-list-dialog/flag-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private dialog: MatDialog,
    private router: Router
    ) { }

  displayFlagList() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(FlagListDialogComponent);
    dialogRef.afterClosed().subscribe((countryID: any) => {
      console.log('Selected country ID:', countryID);
      // Do whatever you need to do with the selected country code
      this.saveToLocalStorage("CountryID", countryID);
    });
  }

  saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Value from saveToLocalStorage : ", value);
  }

  redirectToAddPost() {
    this.router.navigateByUrl('/addPost');
  }


  title = 'IBS - Home';

}
