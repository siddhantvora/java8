import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from "src/app/my-login/login.service";



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(private router: Router,
    private authService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(route)
    // console.log(state)
    if (this.authService.isUserLoggedIn()) {

      return true;

    }

    this.router.navigateByUrl('login')

    return false;
  }
}


