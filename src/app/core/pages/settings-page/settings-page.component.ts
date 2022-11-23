import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { HeaderService } from 'src/app/core/services/header.service';
import { deleteUserById } from 'src/app/users/store/actions/users.actions';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    public dialog: MatDialog,
    private store: Store,
  ) {}

  public deleteUserWithConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) this.store.dispatch(deleteUserById());
    });
  }
}
