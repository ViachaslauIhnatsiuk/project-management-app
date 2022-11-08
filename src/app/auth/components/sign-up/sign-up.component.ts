import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ISignUpRequest } from 'src/app/core/models/auth.interceptor.models';

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

  constructor(private fb: FormBuilder, private authServise: AuthService) {}

  onSubmit() {
    this.authServise.signUp(this.signUpForm.value as ISignUpRequest);
  }

  onCancel() {
    this.signUpForm.reset();
    this.authServise.closeForm();
  }
}
