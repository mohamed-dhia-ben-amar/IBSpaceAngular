import { Component, OnInit } from '@angular/core';
import { Country } from '../Interfaces/interfaces';
import { getCountriesUrl } from '../ApiURL/urls';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-flag-list-dialog',
  templateUrl: './flag-list-dialog.component.html',
  styleUrls: ['./flag-list-dialog.component.css']
})
export class FlagListDialogComponent implements OnInit {

  searchTerm: string = "";
  countries: Country[] = []
  filteredCountries: Country[] = [];

  ngOnInit() {
    this.filteredCountries = this.countries;
  }

  constructor(
    private dialogRef: MatDialogRef<FlagListDialogComponent>,
    private http: HttpClient,
    private dialog: MatDialog
  ) {

    this.getCountries().then((
      countries: Country[]
    ) => {
      this.countries = countries
    })

  }

  filterCountries() {
    if (this.searchTerm) {
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCountries = this.countries;
    }
  }

  getFromLocalStorage(key: string): any {
    if (localStorage.getItem(key) != undefined) {
      return localStorage.getItem(key);
    } else {
      return "";
    }
  }

  selectCountry(country: Country) {
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure you want to select ${country.name}?`
      }
    });
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === 'ok') {
        localStorage.clear();
        console.log(country.id);
        localStorage.setItem('CountryID', country.id);
        const CountryID = this.getFromLocalStorage("CountryID")
        console.log('CountryID: ', CountryID);
        window.location.reload(); // Reload the page after the country is selected
      }
    });
    this.dialogRef.close(country.id);
  }

  closeMenu() {
    this.dialogRef.close();
  }

  async getCountries(): Promise<Country[]> {
    const data = await fetch(getCountriesUrl);
    return await data.json() ?? [];
  }
}
