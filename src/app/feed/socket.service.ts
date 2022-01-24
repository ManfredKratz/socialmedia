import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from "../../environments/environment";
import { Post } from "./feed.interfaces";
import { OnlineList } from "./feed.interfaces";
import { Vote } from "./feed.interfaces";
import { BehaviorSubject } from "rxjs";

/*
 * When service gets called listen to sockets 'post', 'previous post' and 'who is online'
 * to get the data for the posts and the who's online list
 * 
 * functionalitys:
 * addPost() => to emit a new post
 * vote() => to set a vote based on the vote type
 * logout() => to emit the user logout
 * sendUserData() => refresh previous posts
 * refreshFollow() => update Followerstats
 */
@Injectable()
export class SocketService {
  
  private socket: SocketIOClient.Socket = io(environment.socketHost);

  public posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  public onlinelist$: BehaviorSubject<OnlineList[]> = new BehaviorSubject<OnlineList[]>([]);
  public votes$: BehaviorSubject<Vote[]> = new BehaviorSubject<Vote[]>([]);

  constructor() {

    this.socket.on('post', (rawPost: string) => {
      const posts = this.posts$.getValue();
      posts.unshift(JSON.parse(rawPost));
      this.posts$.next(posts);
    });

    this.socket.on('previous posts', (rawPosts: string) => {
      const posts: Post[] = JSON.parse(rawPosts);
      this.posts$.next(posts);
    });

    this.socket.on('who is online', (rawList: any) => {
      const onlineList: OnlineList[] = rawList;
      this.onlinelist$.next(onlineList);
    });
  }

  public addPost(post: Post) {
    this.socket.emit('post', post);
  }

  public vote(votes: Vote) {
    this.socket.emit('vote', votes);
  }

  public logout(username) {
    this.socket.emit('logout', username);
  }

  public close(): void {
    this.socket.close();
    this.posts$.complete();
  }

  public sendUserData(mydata) {
    this.socket.emit('previous posts', mydata);
  }

  public refreshFollow(followdata) {
    this.socket.emit('follow data', followdata);
  }
}
