import { Component} from '@angular/core';
import { TokenDataService } from '../auth/tokenservice/tokendata.service'
import { userdata } from '../auth/tokenservice/userdata.interface'
import { Followdata } from '../auth/tokenservice/userdata.interface'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
  /*
   * To see a users profil the component follows the userdata und the followdata
   * to get informations about the user and get the newest subscribe state
   * 
   * Userdata always contains the same data, which is placed in the JWT
   * FollowData gets updatet by subscribing to other users
   */
export class ProfilComponent {

  constructor(private data: TokenDataService) { }

  public userdata: userdata;
  public followdata: Followdata[] = [];

  ngOnInit() {
    this.data.UserData$.subscribe(userdata => this.userdata = userdata) 
    this.data.follows$.subscribe(followdata => this.followdata = followdata); 
  }  

}
