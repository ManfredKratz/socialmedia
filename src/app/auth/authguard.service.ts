import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  public isLoggedIn: boolean;

  constructor(public auth: AuthenticateService, public router: Router) { }
  /** 
   * Authguard is checking if user has permissions to enter the application.
   * When user isn't autenticated he gets redirected to the login page
  **/
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      this.isLoggedIn = false;
      console.log('[Server] Loginstatus = ' + this.isLoggedIn + '. You dont have permissions.')
      return false;
    }
    this.isLoggedIn = true;
    return true;
  }
}