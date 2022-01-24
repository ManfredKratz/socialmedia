import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilComponent} from './profil/profil.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import { AuthGuardService as AuthGuard } from './auth/authguard.service';
import { MembersComponent } from './members/members.component';

  /*
   * The routes are protected by the AuthGuard which is part of the authentification system
   * canActivate is a AuthGuard function to secure pages, so only allowed users can enter other pages
   */
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'feed', loadChildren: () => import('./feed/feed.module').then(r => r.FeedModule), canActivate: [AuthGuard] },
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}