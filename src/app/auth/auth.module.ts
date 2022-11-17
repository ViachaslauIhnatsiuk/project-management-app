import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthPageComponent } from 'src/app/auth/pages/auth-page/auth-page.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/auth/components/log-in/log-in.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [SignUpComponent, LogInComponent, AuthPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports: [AuthPageComponent],
})
export class AuthModule {}
