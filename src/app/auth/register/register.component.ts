import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import {register} from '../register/register.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
/*
* addUser: send input to backend and register the user
*/
export class RegisterComponent implements OnInit {

  public register: register;
  constructor(private socket: AuthService) {} 

  ngOnInit(): void {
    this.socket.registerUser$.subscribe(register => this.register = register) 
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  addUser(firstname: string, lastname: string, email: string, password: string) {
    this.socket.register({firstname, lastname, email, password});
  }

}
