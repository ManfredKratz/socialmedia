import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'; @Injectable()


export class AuthenticateService {

  constructor(public jwtHelper: JwtHelperService) { }
  /** 
   * isAutheticated function to verify that the user is able to access the application pages
  */
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}


