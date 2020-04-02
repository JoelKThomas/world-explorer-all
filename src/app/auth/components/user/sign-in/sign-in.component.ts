import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  model = {
    email: '',
    password: ''
  };
  token: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/list');
    }
  }
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(res => {
      this.userService.setToken(res);
      this.router.navigateByUrl('/countries');
    },
      error => {
        console.log(error);
        this.serverErrorMessages = error.error;
      }
    );
  }
}
