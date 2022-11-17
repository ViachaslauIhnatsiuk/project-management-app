import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { SettingsService } from 'src/app/core/services/settings.service';
import { deleteUser } from 'src/app/auth/store/actions/auth.actions';
import { getUserId } from 'src/app/board/boards/helpers/boards.helpers';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  constructor(
    public settingsService: SettingsService,
    public dialog: MatDialog,
    private store: Store,
  ) {}

  public deleteUserWithConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    const id = getUserId() as string;

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) this.store.dispatch(deleteUser({ userId: id }));
    });
  }
}
