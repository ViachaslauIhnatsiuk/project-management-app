import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ILogInRequest } from 'src/app/core/models/auth-interceptor.models';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { AuthService } from '../../services/auth.service';
import { logIn } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  logInForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [passwordValidator]],
  });

  constructor(public authService: AuthService, private fb: FormBuilder, private store: Store) {}

  get login() {
    return this.logInForm.get('login');
  }

  get password() {
    return this.logInForm.get('password');
  }

  public onSubmit(): void {
    const fieldValues = this.logInForm.value as ILogInRequest;
    this.store.dispatch(logIn(fieldValues));
  }

  public resetForm(): void {
    this.logInForm.reset();
  }
}
