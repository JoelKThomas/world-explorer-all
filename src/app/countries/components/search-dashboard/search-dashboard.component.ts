import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../service/countries.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.css']
})
export class SearchDashboardComponent implements OnInit {
  data: [];
  currentData = [];
  userFavourites: string[] = [];


  constructor(private countriesService: CountriesService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllCountryDetails();
  }

  getAllCountryDetails() {
    this.countriesService.getAllCountries().subscribe(
      res => {
        this.data = res;
        this.currentData = this.data;
      },
      error => {
        console.log(error);
      }
    );
    this.getUserFavourite();
  }

  applyFilter(value: string) {
    this.currentData = this.filterByValue(this.data, value)
  }

  addCountry(country: string) {
    this.countriesService.postFavouriteCountry(country).subscribe(
      res => {
        this.userFavourites.push(country);
        this.snackBar.open("Added " + country + " favourite list", 'Close', {
          duration: 1000,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  removeCountry(country) {
    this.countriesService.removeFavouriteCountry(country).subscribe(
      res => {
        this.userFavourites = this.userFavourites.filter(obj => obj !== country);
        this.snackBar.open("Removed " + country + " from favourite list", 'Close', {
          duration: 1000,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserFavourite() {
    this.userFavourites = [];
    this.countriesService.getAllUserFavourite().subscribe(
      res => {
        res.forEach(element => {
          this.userFavourites.push(element.favouriteCountry);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  bookmarkCountry(country: string) {
    if (this.userFavourites) {
      return this.userFavourites.includes(country);
    } else {
      return false;
    }
  }

  countryDetail(country) {
    this.router.navigate([`countries/detail/` + country]);
  }

  filterByValue(array, value) {
    return array.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}


