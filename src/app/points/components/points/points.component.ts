import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPoint } from '../../models/points.models';
import { selectPoints } from '../../store/selectors/points.selectors';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent implements OnInit {
  @Input() taskId: string = '';

  private points$ = this.store.select(selectPoints);

  public points: IPoint[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.points$.subscribe((points) => {
      if (this.taskId) {
        this.points = points[this.taskId];
      }
    });
  }
}
