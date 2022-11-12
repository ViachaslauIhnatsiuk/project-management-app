import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { getUserId } from '../../helpers/boards.helpers';
import { ITask } from '../../models/boards.models';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent {
  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { amountOfTasks: number },
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(9),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(9),
      ]),
      userId: new FormControl(window.localStorage.getItem('id')),
    });
  }

  public get newTask(): ITask {
    return <ITask>{
      ...this.form.value,
      userId: getUserId(),
      users: [],
    };
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
