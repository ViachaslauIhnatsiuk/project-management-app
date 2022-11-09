import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ILogInRequest } from 'src/app/core/models/auth.interceptor.models';

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

  constructor(private fb: FormBuilder, private authServise: AuthService) {}

  onSubmit() {
    const fieldValues = this.logInForm.value as ILogInRequest;
    this.authServise.signIn(fieldValues);
  }

  onCancel() {
    this.logInForm.reset();
    this.authServise.closeForm();
  }
}
