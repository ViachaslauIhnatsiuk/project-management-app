import { BoardService } from './../board/boards/services/board.service';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { Store, StoreModule } from '@ngrx/store';
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
import { UsersModule } from '../users/users.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GetUserNameByIdPipe } from './pipes/get-user-name-by-id.pipe';
import { BoardsModule } from '../board/boards/boards.module';
import { logInSuccess } from '../auth/store/actions/auth.actions';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { getUserById } from '../users/store/actions/users.actions';
import { UserService } from '../users/services/user.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
    FooterComponent,
    SidebarComponent,
    SettingsPageComponent,
    EditProfilePageComponent,
    NotFoundPageComponent,
    GetUserNameByIdPipe,
    HomePageComponent,
  ],
  imports: [
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    CommonModule,
    UsersModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CoreRoutingModule,
    AuthModule,
    AuthRoutingModule,
    BoardsModule,
    TranslateModule,
  ],
  providers: [
    BoardService,
    NotificationService,
    ResponseHandlerService,
    AuthGuard,
    httpInterceptorProviders,
    LocalStorageService,
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
export class CoreModule {
  constructor(private store: Store, private userService: UserService) {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.store.dispatch(logInSuccess({ token }));
      this.getUserById();
    }
  }

  private getUserById(): void {
    const id = this.userService.getUserIdFromToken() as string;
    this.store.dispatch(getUserById({ id }));
  }
}
