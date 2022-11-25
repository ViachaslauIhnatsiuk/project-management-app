import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { setBoardFilterByTitle } from '../../store/actions/boards.actions';

@Component({
  selector: 'app-search-boards',
  templateUrl: './search-boards.component.html',
  styleUrls: ['./search-boards.component.scss'],
})
export class SearchBoardsComponent implements OnInit {
  public form = new FormGroup({
    searchInput: new FormControl<string>(''),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.form.controls.searchInput.valueChanges
      .pipe(
        map((value) => value?.trim()),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.store.dispatch(setBoardFilterByTitle({ value: value || '' }));
      });
  }
}
