import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedPageComponent} from './feed-page/feed-page.component';
import {RouterModule} from "@angular/router";
import {PostComponent} from './post/post.component';
import {VotesComponent} from './like-button/votes.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [FeedPageComponent, PostComponent, VotesComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: FeedPageComponent}
    ]),
  ]
})

export class FeedModule {
}
