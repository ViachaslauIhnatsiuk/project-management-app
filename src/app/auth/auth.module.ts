import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageComponent } from 'src/app/auth/pages/auth-page/auth-page.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/auth/components/log-in/log-in.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';

@NgModule({
  declarations: [SignUpComponent, LogInComponent, AuthPageComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
