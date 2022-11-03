import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from 'src/app/auth/components/log-in/log-in.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'auth/logIn', component: LogInComponent },
  { path: 'auth/signUp', component: SignUpComponent },
  { path: '', redirectTo: '/auth/logIn', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
