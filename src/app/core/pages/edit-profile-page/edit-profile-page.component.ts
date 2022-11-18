import { Store } from '@ngrx/store';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IEditUserDataRequest } from 'src/app/core/models/settings-interceptor.models';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { updateUser } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent {
  public editForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [passwordValidator]],
  });

  constructor(
    public fb: FormBuilder,
    public settingsService: SettingsService,
    private store: Store,
  ) {}

  get name() {
    return this.editForm.get('name');
  }

  get login() {
    return this.editForm.get('login');
  }

  get password() {
    return this.editForm.get('password');
  }

  public onSubmit(): void {
    const fieldValues = this.editForm.value as IEditUserDataRequest;
    this.store.dispatch(updateUser(fieldValues));
  }

  public resetForm(): void {
    this.editForm.reset();
  }
}
