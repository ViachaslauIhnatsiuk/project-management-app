import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ITask } from '../../models/tasks.models';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private store: Store,
  ) {
    this.initializeForm(data);
  }

  private initializeForm(task: ITask): void {
    this.form = new FormGroup({
      title: new FormControl(task.title, [Validators.required, Validators.maxLength(40)]),
      description: new FormControl(task.description, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      users: new FormControl<string[]>(task.users as string[]),
    });
  }

  public get editedTask(): ITask {
    return this.form.value;
  }

  public onTasksUsersChange(userIdList: string[] | null): void {
    if (userIdList) this.form.get('users')?.setValue(userIdList);
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
