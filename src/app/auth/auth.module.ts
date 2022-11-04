import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { AuthPageComponent } from 'src/app/auth/pages/auth-page/auth-page.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/auth/components/log-in/log-in.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SignUpComponent, LogInComponent, AuthPageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    AuthRoutingModule,
  ],
  exports: [AuthPageComponent],
})
export class AuthModule {}
