import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ILogInRequest } from 'src/app/core/models/auth-interceptor.models';
import { logIn } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  logInForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authServise: AuthService, private store: Store) {}

  onSubmit() {
    const fieldValues = this.logInForm.value as ILogInRequest;
    this.store.dispatch(logIn(fieldValues));
  }

  onCancel() {
    this.logInForm.reset();
    this.authServise.closeForm();
  }
}
