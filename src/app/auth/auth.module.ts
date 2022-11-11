import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthPageComponent } from 'src/app/auth/pages/auth-page/auth-page.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/auth/components/log-in/log-in.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [SignUpComponent, LogInComponent, AuthPageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AuthRoutingModule,
  ],
  exports: [AuthPageComponent],
})
export class AuthModule {}
