import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  constructor(public settingsService: SettingsService, public dialog: MatDialog) {}

  public deleteUserWithConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((isConfirm) => {
      // TODO: Here need recieve userId from store
      const id: string = 'userId from store';
      if (isConfirm) this.settingsService.deleteUser(id);
    });
  }
}
