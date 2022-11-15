import { BoardService } from './../board/boards/services/board.service';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { AuthModule } from '../auth/auth.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { httpInterceptorProviders } from 'src/app/core/interceptors/interceptors';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ResponseHandlerService } from './services/response-handler.service';
import { AuthGuard } from './guards/auth.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { IsFalsyPipe } from './pipes/is-falsy.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
    FooterComponent,
    SidebarComponent,
    SettingsPageComponent,
    EditProfilePageComponent,
    NotFoundPageComponent,
    IsFalsyPipe,
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
  providers: [
    BoardService,
    NotificationService,
    ResponseHandlerService,
    AuthGuard,
    httpInterceptorProviders,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    SidebarComponent,
    SettingsPageComponent,
    EditProfilePageComponent,
  ],
})
export class CoreModule {}
