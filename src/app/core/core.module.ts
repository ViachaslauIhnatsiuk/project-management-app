import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BoardService } from '../boards/services/board.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    AuthModule,
    AuthRoutingModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
    MatToolbarModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    SidebarComponent,
    SettingsPageComponent,
    EditProfilePageComponent,
  ],
  providers: [BoardService, httpInterceptorProviders],
})
export class CoreModule {
  static forFeature: any;
}
