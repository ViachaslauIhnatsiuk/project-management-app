import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { logOut } from 'src/app/auth/store/actions/auth.actions';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    private userService: UserService,
    public dialog: MatDialog,
    private store: Store,
    private router: Router,
  ) {}

  public deleteUserWithConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.userService.deleteUser();
        this.store.dispatch(logOut());
        this.router.navigate(['/welcome']);
      }
    });
  }
}
