import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserService } from '../service/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let host = req.url.split('//').pop().split('/')[0];
        if (req.headers.get('noauth') || host === "restcountries.eu")
            return next.handle(req.clone());
        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    error => {
                        if (error.auth == false) {
                            this.router.navigateByUrl('/auth/login');
                        }
                    })
            );
        }
    }
}
