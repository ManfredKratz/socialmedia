import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { register } from './register/register.interface'
import { login } from './login/login.interface'
import * as io from 'socket.io-client';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from './authguard.service';

@Injectable()
export class AuthService {

  private socket: SocketIOClient.Socket = io(environment.socketHost);

  private InitalRegisterObject = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }
  private InitalLoginObject = {
    email: '',
    password: ''
  }

  public registerUser$: BehaviorSubject<register> = new BehaviorSubject<register>(this.InitalRegisterObject);
  public loginUser$: BehaviorSubject<login> = new BehaviorSubject<login>(this.InitalLoginObject);
  
  /**
   * listen on "reg_status" & "login_status" to get the objects from the channels and handle responses.
   * (Fehlermeldungen werden nur zum Debug in der Konsole ausgegeben.)
   */
  public jwtHelper: JwtHelperService;
  constructor(private router: Router) {

    this.socket.on('reg_status', (status, canActivate: AuthGuardService) => {
      if (status == true) {
        this.router.navigate(['login']);
        console.log("[Server] A user has joined the community.")
      }
      else if (status == 'exist') {
        console.log("[Server] E-mail adress is already taken.")
      }
      else {
        console.log("[Server] User registration failed.")
      }
    });

    this.socket.on('login_status', (status) => {
      if (status.title == 'login success') {
        localStorage.setItem("token", status.token);
        this.router.navigate(['feed']);
        console.log("[Server] A user logged in.\n[Token] A token was created.")
      } else {
        console.log("[Server] Invalid login data.")
      }
    });
  }
  /** 
   * register & login function to emit the inputs to the socket
   * & close the socket connection.
  */
  public register(register: register) {
    this.socket.emit('register', register);
  }

  public login(login: login) {
    this.socket.emit('login', login);
  }

  public close(): void {
    this.socket.close();
    this.registerUser$.complete();
    this.loginUser$.complete();
  }

}
