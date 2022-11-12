import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISignUpRequest } from 'src/app/core/models/auth-interceptor.models';
import { signUp } from '../../store/actions/auth.actions';
import { IAuthStateError } from '../../store/models/auth.models';
import { selectError, selectIsLoading } from '../../store/selectors/auth.selectors';

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
  loading$!: Observable<boolean>;
  error$!: Observable<IAuthStateError>;

  constructor(private fb: FormBuilder, private router: Router, private store: Store) {}

  ngOnInit() {
    this.loading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  onSubmit() {
    const fieldValues = this.signUpForm.value as ISignUpRequest;
    this.store.dispatch(signUp(fieldValues));
  }

  onCancel() {
    this.signUpForm.reset();
    this.router.navigate(['']);
  }
}
