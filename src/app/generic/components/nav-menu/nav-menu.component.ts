import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  username: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const jwtToken = this.userService.getToken();
    // Get the last name of logged in user
    // to be displayed in the top right section of nav menu
    if (jwtToken) {
      const userInfo = this.userService.getUserPayload();
      this.username = userInfo['username'];
    }
  }
  logout() {
    this.userService.deleteToken();
    this.router.navigate([`auth`]);
  }

  favourites() {
    this.router.navigate([`countries/favourite/`]);
  }
}
