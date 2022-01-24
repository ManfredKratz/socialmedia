import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { userdata } from './userdata.interface'
import { Followdata } from './userdata.interface'
import * as io from 'socket.io-client';
import { environment } from "../../../environments/environment";

@Injectable()
export class TokenDataService {

  private socket: SocketIOClient.Socket = io(environment.socketHost);

  private UserData = {
    email: '',
    firstname: '',
    lastname: ''
  }

  public follows$: BehaviorSubject<Followdata[]> = new BehaviorSubject<Followdata[]>([]);
  public UserData$: BehaviorSubject<userdata> = new BehaviorSubject<userdata>(this.UserData);

  /*
  * This Service is checking for a valid token in the local storage and sets the userdata.
  *
  *    this.socket.emit('follow data', email); => send JSON of logged in user to backend to receive the followerdata
  *    this.socket.emit('has follow', user_id); => send JSON of logged in user to backend to check subscriptions to other users
  *    this.socket.emit('memberlist', user_id); => send JSON of logged in user to backend to extract the user out of the memberlist
  *    (This is done to prevent that the user might follow himself.)
  * 
  * After sending userdata to backend we listen to the following sockets
  *    'follow data' to get the followerstats of the currently logged in user
  *    'has follow'  to get information about followed user by the currently logged in user
  *    
  */
 constructor() {

  const token = localStorage.getItem('token');
  if (token != null) {
    var TokenPayload = jwtDecode(token);
    console.log(TokenPayload)
    this.UserData.email = TokenPayload.json_name.email;
    this.UserData.firstname = TokenPayload.json_name.firstname;
    this.UserData.lastname = TokenPayload.json_name.lastname;
  
    let user_id = {
      user: this.UserData.email
    }
    this.socket.emit('follow data', user_id);
    this.socket.emit('memberlist', user_id);
    this.socket.emit('previous posts', user_id);
  } else {
    console.log("Permissions denied. Token required.")
  }
  this.socket.on('follow data', (rawFollowData: string) => {
    var data: Followdata[] = JSON.parse(rawFollowData);
    this.follows$.next(data);
  });
}
ngOnInit() {
}


}