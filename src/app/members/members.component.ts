import { Component, OnInit, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from "../../environments/environment";
import { MemberList } from "./members.interface"
import { Follow } from "./members.interface"
import { BehaviorSubject } from "rxjs";
import { TokenDataService } from '../auth/tokenservice/tokendata.service'
import { userdata } from '../auth/tokenservice/userdata.interface'
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})

@Injectable()
export class MembersComponent implements OnInit {

  public memberlist: MemberList[];
  public userdata: userdata;

  private socket: SocketIOClient.Socket = io(environment.socketHost);
  public members$: BehaviorSubject<MemberList[]> = new BehaviorSubject<MemberList[]>([]);

  constructor(private data: TokenDataService) { 

    this.socket.on('memberlist', (rawMember: string) => {
      const memberlist: MemberList[] = JSON.parse(rawMember);
      this.members$.next(memberlist);
    });
  }

  ngOnInit() {
    this.members$.subscribe(memberlist => this.memberlist = memberlist) 
    this.data.UserData$.subscribe(userdata => this.userdata = userdata) 
    const mydata = {
      user: this.userdata.email
    }
    this.socket.emit('memberlist', mydata)
  }
  
  ngOnDestroy(): void {
    this.socket.close();
  }

  followUser(request: Follow) {
    this.socket.emit('follow', request);
    console.log(request)
  }

}
