import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { AuthModule } from '../auth/auth.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { httpInterceptorProviders } from 'src/app/core/interceptors/interceptors';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
    FooterComponent,
    SidebarComponent,
    SettingsPageComponent,
    EditProfilePageComponent,
  ],
  imports: [
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    AuthModule,
    AuthRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    SidebarComponent,
    SettingsPageComponent,
    EditProfilePageComponent,
  ],
  providers: [httpInterceptorProviders],
})
export class CoreModule {}
