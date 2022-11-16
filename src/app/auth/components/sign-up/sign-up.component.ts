import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISignUpRequest } from 'src/app/core/models/auth-interceptor.models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { signUp } from 'src/app/auth/store/actions/auth.actions';
import { IAuthStateError } from 'src/app/auth/store/models/auth.models';
import { selectError, selectIsLoading } from 'src/app/auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading$!: Observable<boolean>;

  error$!: Observable<IAuthStateError>;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  public onSubmit(): void {
    const fieldValues = this.signUpForm.value as ISignUpRequest;
    this.store.dispatch(signUp(fieldValues));
  }

  public onCancel(): void {
    this.signUpForm.reset();
    this.router.navigate(['']);
  }
}
