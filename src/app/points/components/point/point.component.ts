import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DEFAULT_MODAL_SIZE } from 'src/app/board/constants/board.constants';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { IPoint, PointUpdate } from '../../models/points.models';
import { deletePoint, updatePoint } from '../../store/actions/points.actions';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
})
export class PointComponent implements OnInit {
  @Input() point!: IPoint;

  public isEditMode: boolean = false;

  public pointTitle: string = '';

  constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnInit() {
    this.pointTitle = this.point.title;
  }

  public deletePoint(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.store.dispatch(deletePoint({ pointId: this.point._id }));
      }
    });
  }

  public editPoint(): void {
    if (this.pointTitle !== this.point.title) {
      const updatedPoint: PointUpdate = {
        title: this.pointTitle,
        done: this.point.done,
      };

      this.store.dispatch(updatePoint({ pointId: this.point._id, updatedPoint }));
    }

    this.disableEditMode();
  }

  public onChangeCheckbox(event: MatCheckboxChange): void {
    this.disableEditMode();

    const updatedPoint: PointUpdate = {
      done: event.checked,
      title: this.point.title,
    };

    this.store.dispatch(
      updatePoint({
        pointId: this.point._id,
        updatedPoint,
      }),
    );
  }

  public enableEditMode(): void {
    this.isEditMode = true;
  }

  public disableEditMode(): void {
    this.isEditMode = false;
  }
}
