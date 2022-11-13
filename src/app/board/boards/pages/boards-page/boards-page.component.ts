import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { selectToken } from 'src/app/auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectToken).subscribe((token) => {
      const { id } = this.authService.getUserDataFromToken(token);
      this.store.dispatch(getUser({ userId: id }));
    });
  }
}
