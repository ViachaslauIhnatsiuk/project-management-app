import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from 'src/app/auth/pages/auth-page/auth-page.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';

const routes: Routes = [
  // TODO: Redirect to welcome or home page
  // { path: '', component: 'HomePage', pathMatch: 'full' },

  { path: 'auth', component: AuthPageComponent },

  // TODO: when will implement notFoundPage
  // { path: '**', redirectTo: 'notFoundPage', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
