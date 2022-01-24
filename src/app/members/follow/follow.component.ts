import { Component, OnInit, Input } from '@angular/core';
import { TokenDataService } from '../../auth/tokenservice/tokendata.service'
import { userdata } from '../../auth/tokenservice/userdata.interface'
import { MembersComponent } from "../../members/members.component";
import { MemberList } from '../members.interface';
import { SocketService } from "../../feed/socket.service"

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
  providers: [SocketService]
})
export class FollowComponent implements OnInit {

  @Input() selectedMember: MemberList;
  public userdata: userdata;
  constructor(private data: TokenDataService, private members: MembersComponent, private socket: SocketService) { }
  
  ngOnInit() {
    this.data.UserData$.subscribe(userdata => this.userdata = userdata) 
  }

  followUser() {
    this.members.followUser({type: "follow", user: this.userdata.email, person_follow: this.selectedMember.user});
    const user_id = {
      user: this.userdata.email
    }
    this.socket.refreshFollow(user_id)
  } 

}
