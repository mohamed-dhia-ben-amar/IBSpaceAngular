import { Component } from '@angular/core';
import { FlagListDialogComponent } from '../flag-list-dialog/flag-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user$ = this.authService.currentUser$;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService
    ) { }

  displayFlagList() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(FlagListDialogComponent);
    dialogRef.afterClosed().subscribe((countryID: any) => {
      // Do whatever you need to do with the selected country code
      this.saveToLocalStorage("CountryID", countryID);
    });
  }

  saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  redirectToAddPost() {
    this.router.navigateByUrl('/addPost');
  }

  SignOut() {
    this.authService.logout().subscribe(() => {
      localStorage.clear()
      this.router.navigate(['login'])
    })
  }


  title = 'IBS - Home';

}
