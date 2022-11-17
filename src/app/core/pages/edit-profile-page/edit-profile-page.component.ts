import { SettingsService } from 'src/app/core/services/settings.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IEditUserDataRequest } from 'src/app/core/models/settings-interceptor.models';
import { passwordValidator } from 'src/app/shared/validators/password.validator';

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

  constructor(public fb: FormBuilder, public settingsService: SettingsService) {}

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

    // TODO: Here need recieve userId from store
    const id: string = 'userId from store';
    this.settingsService.editUserData(id, fieldValues);
  }

  public resetForm(): void {
    this.editForm.reset();
  }
}
