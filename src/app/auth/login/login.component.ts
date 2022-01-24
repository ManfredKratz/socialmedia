import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service' 
import {login} from '../login/login.interface'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
/*
* loginUser: send login input to backend and verify the user
*/
export class LoginComponent implements OnInit {
  public login: login;
  constructor(private socket: AuthService) { }

  ngOnInit(): void {
    this.socket.loginUser$.subscribe(login => this.login = login)
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  loginUser(email: string, password: string) {
    this.socket.login({email, password});
  }

}
