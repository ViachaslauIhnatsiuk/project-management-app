import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from 'src/app/auth/pages/auth-page/auth-page.component';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponent },

  // TODO: when will implement notFoundPage
  // { path: '**', redirectTo: 'notFoundPage', pathMatch: 'full' },
  {
    path: 'boards',
    loadChildren: () => import('../boards/boards.module').then((m) => m.BoardsModule),
  },
  { path: '', redirectTo: '/boards', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
