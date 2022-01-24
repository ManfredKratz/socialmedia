import { Component, OnInit, Input } from '@angular/core';
import {OnlineList} from "../feed.interfaces";
import {SocketService} from "../socket.service";
import { TokenDataService } from '../../auth/tokenservice/tokendata.service';
import { userdata } from '../../auth/tokenservice/userdata.interface';
import { Followdata } from '../../auth/tokenservice/userdata.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
  /*
   * Logout Function is splitted up in two parts:
   *  1) Get the user-identifier from token and send it to backend (Remove user from 'who's online list').
   *  2) Remove JWT to finish the logout process.
   */
export class SidebarComponent implements OnInit {

  public onlinelist: OnlineList[] = [];
  public userdata: userdata;
  public followdata: Followdata[] = [];

  constructor(private socket: SocketService, private data: TokenDataService) {}

  ngOnInit() {
    this.socket.onlinelist$.subscribe(onlinelist => this.onlinelist = onlinelist);
    this.data.UserData$.subscribe(userdata => this.userdata = userdata); 
    this.data.follows$.subscribe(followdata => this.followdata = followdata); 
  }

  public logout() {
    const LogOutJSON = {
      user: this.userdata.email,
    }
    this.socket.logout(LogOutJSON);
    this.logout_();
  }

  public logout_() {
    window.location.reload();
    localStorage.removeItem('token');
    console.log('[Server] A user has been logged out.');
  }
}
