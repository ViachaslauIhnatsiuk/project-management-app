import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISignUpRequest } from 'src/app/core/models/auth-interceptor.models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { signUp } from 'src/app/auth/store/actions/auth.actions';
import { IAuthStateError } from 'src/app/auth/store/models/auth.models';
import { selectError, selectAuthIsLoading } from 'src/app/auth/store/selectors/auth.selectors';
import { passwordValidator } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [passwordValidator]],
  });

  loading$!: Observable<boolean>;

  error$!: Observable<IAuthStateError>;

  constructor(public authService: AuthService, private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectAuthIsLoading);
    this.error$ = this.store.select(selectError);
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get login() {
    return this.signUpForm.get('login');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  public onSubmit(): void {
    const fieldValues = this.signUpForm.value as ISignUpRequest;
    this.store.dispatch(signUp(fieldValues));
  }

  public resetForm(): void {
    this.signUpForm.reset();
  }
}
