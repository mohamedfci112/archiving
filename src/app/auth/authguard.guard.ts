import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {


  constructor(private dataService: UserService, private router: Router ) {}

  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
  const routeurl: string = state.url;
  return this.isLogin(routeurl);
  }

  // tslint:disable-next-line:typedef
  isLogin(routeurl: string) {
  if (this.dataService.isLoggedIn()) {
  return true;
  }
  this.router.navigate(['/login'], {queryParams: { returnUrl: routeurl }} );
  }
}
