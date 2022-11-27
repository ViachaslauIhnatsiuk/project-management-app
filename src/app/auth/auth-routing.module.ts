import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from 'src/app/auth/components/log-in/log-in.component';
import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'logIn', component: LogInComponent },
  { path: 'signUp', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
