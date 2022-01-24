import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthModule } from "./auth/auth.module";
import { AuthGuardService } from './auth/authguard.service';
import { AuthService } from './auth/auth.service';
import { TokenDataService } from './auth/tokenservice/tokendata.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembersComponent } from './members/members.component';
import { FollowComponent } from './members/follow/follow.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    MembersComponent,
    FollowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [ JwtHelperService, AuthGuardService, AuthService, TokenDataService],
  bootstrap: [AppComponent]
})

export class AppModule {}
