import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../feed.interfaces";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
  /*
  * When the post component get's loaded get the posts from the socket service
  */
export class PostComponent implements OnInit {
  @Input() public post: Post | null = null;

  constructor() {
  }

  ngOnInit() {
  }

}
