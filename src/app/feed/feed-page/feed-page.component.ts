import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Post } from "../feed.interfaces";
import { SocketService } from "../socket.service";
import { TokenDataService } from '../../auth/tokenservice/tokendata.service'
import { userdata } from '../../auth/tokenservice/userdata.interface'

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  providers: [SocketService]
})
/*
* When the feedpage component gets loaded, subscribe to posts and userdata
* addPost() => create by post with userdata
* vote() => vote a post by identifying the votetype from html select
*/
export class FeedPageComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];
  public post_id: null;
  public votes: null;
  public userdata: userdata;
  public start = new Date().toLocaleString();

  constructor(private socket: SocketService, private data: TokenDataService) { }

  ngOnInit(): void {
    this.socket.posts$.subscribe(posts => this.posts = posts);
    this.data.UserData$.subscribe(userdata => this.userdata = userdata)
    const mydata = {
      user: this.userdata.email
    }
    this.socket.sendUserData(mydata)
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  addPost(content: string) {
    if (content != "") {
      this.socket.addPost({ post_id: this.post_id, user_id: this.userdata.email, author: this.userdata.firstname + " " + this.userdata.lastname, timestamp: this.start, content, votes: this.votes, up: "", down: "" });
    }
  }
  vote(vote) {
    this.socket.vote({ post_id: this.post_id, type: vote.id, user: this.userdata.email });
  }
}
