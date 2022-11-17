import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUsers } from 'src/app/users/store/actions/users.actions';
import { getBoardById } from '../../store/actions/boards.actions';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent {
  constructor(private store: Store, private route: ActivatedRoute) {
    this.getBoardById();
    this.store.dispatch(getUsers());
  }

  private getBoardById(): void {
    this.route.params.subscribe((params) => {
      this.store.dispatch(getBoardById({ boardId: params['id'] }));
    });
  }
}
