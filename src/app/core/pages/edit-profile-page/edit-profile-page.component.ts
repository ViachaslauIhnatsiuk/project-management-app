import { Store } from '@ngrx/store';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { updateUserById } from 'src/app/users/store/actions/users.actions';
import { IUpdatedUserData } from 'src/app/users/store/models/users.models';

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
    const fieldValues = this.editForm.value as IUpdatedUserData;
    this.store.dispatch(updateUserById({ updatedUserData: fieldValues }));
    this.resetForm();
  }

  public resetForm(): void {
    this.editForm.reset();
    this.editForm.markAsUntouched();
    this.editForm.markAsPristine();
  }
}
