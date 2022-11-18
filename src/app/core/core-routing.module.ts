import { SidebarComponent } from 'src/app/core/components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SettingsPageComponent } from 'src/app/core/pages/settings-page/settings-page.component';
import { EditProfilePageComponent } from 'src/app/core/pages/edit-profile-page/edit-profile-page.component';
import { WelcomePageComponent } from 'src/app/core/pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from 'src/app/core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule) },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'boards',
        loadChildren: () => import('../board/boards/boards.module').then((m) => m.BoardsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
      {
        path: 'settings/edit-profile',
        component: EditProfilePageComponent,
      },
    ],
  },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'notFoundPage', component: NotFoundPageComponent },
  { path: '**', redirectTo: 'notFoundPage' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
