import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { Store } from '@ngrx/store';

import { IPoint } from '../../models/points.models';
import { selectPoints } from '../../store/selectors/points.selectors';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent implements OnInit, AfterContentChecked {
  @Input() taskId: string = '';

  private points$ = this.store.select(selectPoints);

  public points: IPoint[] = [];

  public checkedPointsPercentage: number = 0;

  constructor(private store: Store) {}

  private changePercentage(): void {
    if (this.points) {
      this.checkedPointsPercentage = Math.round(
        (this.points.filter((point) => point.done).length / this.points.length) * 100,
      );
    }
  }

  ngOnInit(): void {
    this.points$.subscribe((points) => {
      if (this.taskId) {
        this.points = points[this.taskId];
      }
    });

    this.changePercentage();
  }

  ngAfterContentChecked(): void {
    this.changePercentage();
  }
}
