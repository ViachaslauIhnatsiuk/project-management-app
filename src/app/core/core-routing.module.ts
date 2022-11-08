import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
