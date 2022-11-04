import { Injectable } from '@angular/core';

@Injectable()
export class BoardModalService {
  public isCreateBoardModalVisible = false;

  public isUpdateBoardModalVisible = false;

  public openCreateBoardModal(): void {
    this.isCreateBoardModalVisible = true;
  }

  public closeCreateBoardModal(): void {
    this.isCreateBoardModalVisible = false;
  }

  public openUpdateBoardModal(): void {
    this.isUpdateBoardModalVisible = true;
  }

  public closeUpdateBoardModal(): void {
    this.isUpdateBoardModalVisible = false;
  }
}
