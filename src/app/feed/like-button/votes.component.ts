import { Component, OnInit } from '@angular/core';
import { TokenDataService } from '../../auth/tokenservice/tokendata.service'
import { userdata } from '../../auth/tokenservice/userdata.interface'
import { SocketService } from "../socket.service";
import { PostComponent } from "../post/post.component";

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],

})
/*
* When component gets loaded get userdata (Is needed to know who has set a vote)
* voteup() to emit on which post has been voted and the vote status (up) and who has voted
*  votedown() to emit on which post has been voted and the vote status (down) and who has voted
*/
export class VotesComponent implements OnInit {
  public userdata: userdata;
  public VotedUp = false;
  public VotedDown = false;
  public post_id = this.posts.post.post_id;
  public votes = this.posts.post.votes;
  public upvotes = this.posts.post.up;
  public downvotes = this.posts.post.down;

  constructor(private socket: SocketService, private data: TokenDataService, private posts: PostComponent) { }

  ngOnInit() {
    this.data.UserData$.subscribe(userdata => this.userdata = userdata)
  }

  voteup(vote) {
    this.socket.vote({ post_id: this.post_id, type: vote.id, user: this.userdata.email });
    if (this.userdata.email.includes(this.upvotes)) {
      this.VotedUp = true;
    } else {
      this.VotedUp = false;
    }
  }

  votedown(vote) {
    this.socket.vote({ post_id: this.post_id, type: vote.id, user: this.userdata.email });
    if (this.userdata.email.includes(this.downvotes)) {
      this.VotedDown = true;
    } else {
      this.VotedDown = false;
    }
  }
}
