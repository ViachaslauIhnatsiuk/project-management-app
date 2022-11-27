import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/auth/components/log-in/log-in.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignUpComponent, LogInComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    AuthRoutingModule,
    TranslateModule,
  ],
  exports: [],
})
export class AuthModule {}
