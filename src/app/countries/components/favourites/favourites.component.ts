import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../service/countries.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Countries } from "../../model/countries.model"

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  data: Countries;
  favouriteFound: false;
  userFavourites: string[] = [];
  userFavouriteCountryDetails: Countries[] = [];
  constructor(private countriesService: CountriesService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserFavouriteCountry();
    // this.getUserFavourite();

  }

  getUserFavouriteCountry() {
    this.countriesService.getAllUserFavourite().subscribe(
      res => {
        res.forEach(element => {
          this.userFavourites.push(element.favouriteCountry);
          this.countriesService.getCountryDetail(element.favouriteCountry).subscribe(
            res => {
              this.data = res[0];
              this.userFavouriteCountryDetails.push(this.data);
            },
            error => {
              console.log(error);
            }
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  // getUserFavourite() {
  //   this.userFavourites = [];
  //   this.countriesService.getAllUserFavourite().subscribe(
  //     res => {
  //       res.forEach(element => {
  //         this.userFavourites.push(element.favouriteCountry);
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }


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
  bookmarkCountry(country: string) {
    if (this.userFavourites) {
      return this.userFavourites.includes(country);
    } else {
      return false;
    }
  }
}
