import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ISignUpRequest } from 'src/app/core/models/auth-interceptor.models';
import { signUp } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authServise: AuthService, private store: Store) {}

  onSubmit() {
    const fieldValues = this.signUpForm.value as ISignUpRequest;
    this.store.dispatch(signUp(fieldValues));
  }

  onCancel() {
    this.signUpForm.reset();
    this.authServise.closeForm();
  }
}
