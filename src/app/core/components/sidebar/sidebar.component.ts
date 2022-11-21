import { IBoard } from 'src/app/board/boards/models/boards.models';
import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { selectBoards } from 'src/app/board/boards/store/selectors/boards.selectors';
import { getBoards } from 'src/app/board/boards/store/actions/boards.actions';
import { Router } from '@angular/router';
import { selectColumnsIsLoading } from 'src/app/board/columns/store/selectors/columns.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterContentChecked {
  public columnsIsLoading$ = this.store.select(selectColumnsIsLoading);

  public boards$ = this.store.select(selectBoards);

  private boardId!: string;

  constructor(
    public headerService: HeaderService,
    private store: Store,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.store.dispatch(getBoards());
  }

  public openBoard(selectedBoard: IBoard): void {
    this.boards$.subscribe((boards) =>
      boards.find((board) => {
        if (board._id === selectedBoard._id) {
          this.boardId = board._id as string;
        }
      }),
    );
    this.router.navigate([`boards/${this.boardId}`]);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
