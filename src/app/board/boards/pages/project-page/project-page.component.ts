import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPointsByUserId } from 'src/app/points/store/actions/points.actions';
import { getUsers } from 'src/app/users/store/actions/users.actions';
import { selectUser } from 'src/app/users/store/selectors/users.selectors';
import { getBoardById } from '../../store/actions/boards.actions';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent {
  private users$ = this.store.select(selectUser);

  constructor(private store: Store, private route: ActivatedRoute) {
    this.getBoardById();
    this.store.dispatch(getUsers());

    this.users$.subscribe((user) => {
      if (user && user._id) {
        this.store.dispatch(getPointsByUserId({ userId: user._id }));
      }
    });
  }

  private getBoardById(): void {
    this.route.params.subscribe((params) => {
      this.store.dispatch(getBoardById({ boardId: params['id'] }));
    });
  }
}
