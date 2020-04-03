import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../service/countries.service';
import { MatTableDataSource } from '@angular/material/table';
import { Countries } from "../../model/countries.model"
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  data: any[] = [];
  displayedColumns = ['iso639_1', 'iso639_2', 'name', 'nativeName'];
  displayedColumnsBorder = ['flag', 'code', 'name', 'capital'];
  public dataSource: any;
  public borderDataSource: any;
  loadSpinner: boolean;
  borderList: Countries[] = [];
  userFavourites: string[] = [];


  constructor(private route: ActivatedRoute, private countriesService: CountriesService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.countriesService.getCountryDetail(id).subscribe(
      res => {
        this.data = res[0];
        this.dataSource = new MatTableDataSource(this.data['languages']);
        this.getBorderDetails(this.data['borders']);
        console.log(this.data['borders']);
      },
      error => {
        console.log(error);
      }
    );
    this.getUserFavourite();
  }

  getBorderDetails(Border) {
    for (let index = 0; index < Border.length; index++) {
      const element = Border[index];
      this.countriesService.getAllBorder(element).subscribe(
        res => {
          this.borderList.push(res);
          console.log(this.borderList);
        },
        error => {
          console.log(error);
        }
      )
    }
    setTimeout(() => {
      this.borderDataSource = new MatTableDataSource(this.borderList);
    }, 2000);


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
