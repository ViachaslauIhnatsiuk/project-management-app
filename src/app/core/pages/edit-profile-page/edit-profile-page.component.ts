import { SettingsService } from './../../services/settings.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IEditUserDataRequest } from '../../models/settings-interceptor.models';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent {
  public editForm = this.fb.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(public fb: FormBuilder, public settingsService: SettingsService) {}

  public onSubmit(): void {
    const fieldValues = this.editForm.value as IEditUserDataRequest;
    this.settingsService.editUserData(fieldValues);
  }

  public resetForm(): void {
    this.editForm.reset();
  }
}
