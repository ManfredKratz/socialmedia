import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticateService } from './authenticate.service'
import { TokenDataService } from './tokenservice/tokendata.service';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),],
  providers: [LoginComponent, RegisterComponent, AuthenticateService, TokenDataService
  ]
})

export class AuthModule {
}
