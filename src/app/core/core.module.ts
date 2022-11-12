import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { httpInterceptorProviders } from 'src/app/core/interceptors/interceptors';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ResponseHandlerService } from './services/response-handler.service';

@NgModule({
  declarations: [HeaderComponent, WelcomePageComponent, SidebarComponent, FooterComponent],
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
  exports: [HeaderComponent, WelcomePageComponent, SidebarComponent, FooterComponent],
  providers: [BoardService, NotificationService, ResponseHandlerService, httpInterceptorProviders],
})
export class CoreModule {}
