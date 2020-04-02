import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../auth/service/user.service';

const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  data = {};
  email: string;
  externalUrl = 'https://restcountries.eu/rest/v2';
  springUrl = 'http://localhost:8081/worldexplorer/api/v1';

  constructor(private http: HttpClient, private userService: UserService) {
    const jwtToken = this.userService.getToken();
    if (jwtToken) {
      const userInfo = this.userService.getUserPayload();
      this.email = userInfo['email'];
    }
  }

  getAllCountries() {
    return this.http.get<any>(`${this.externalUrl}/all`);
  }

  getCountryDetail(country) {
    return this.http.get<any>(`${this.externalUrl}/name/${country}?fullText=true`);
  }
  getAllBorder(border) {
    return this.http.get<any>(`${this.externalUrl}/alpha/${border}`);
  }

  postFavouriteCountry(country) {
    this.data = {};
    this.data['favouriteCreatedBy'] = this.email;
    this.data['favouriteCountry'] = country
    console.log(this.data);
    return this.http.post<any>(`${this.springUrl}/favourite`, this.data, httpOptions);
  }

  getAllUserFavourite() {
    this.data = {};
    this.data['favouriteCreatedBy'] = this.email;
    return this.http.post<any>(`${this.springUrl}/favourite/user`, this.data, httpOptions);
  }

  removeFavouriteCountry(country) {
    this.data = {};
    this.data['favouriteCreatedBy'] = this.email;
    this.data['favouriteCountry'] = country;
    return this.http.post(`${this.springUrl}/favourite/user/country/delete`, this.data, { responseType: 'text' });
  }
}

