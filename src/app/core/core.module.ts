import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BoardService } from '../boards/services/board.service';
import { BoardsInterceptor } from './interceptors/boards.interceptor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';

@NgModule({
  declarations: [HeaderComponent, WelcomePageComponent, SidebarComponent, SettingsPageComponent, EditProfilePageComponent],
  imports: [
    CommonModule,
    FormsModule,
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
  exports: [HeaderComponent, WelcomePageComponent, SidebarComponent, SettingsPageComponent],
  providers: [
    BoardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BoardsInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
