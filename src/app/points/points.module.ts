import { NgModule } from '@angular/core';
import { CreatePointComponent } from './components/create-point/create-point.component';
import { PointsComponent } from './components/points/points.component';
import { PointComponent } from './components/point/point.component';
import { PointService } from './services/point.service';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { pointsReducer } from './store/reducers/points.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PointsEffects } from './store/effects/points.effects';
import { PointFormComponent } from './components/point-form/point-form.component';

@NgModule({
  declarations: [CreatePointComponent, PointsComponent, PointComponent, PointFormComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('points', pointsReducer),
    EffectsModule.forFeature([PointsEffects]),
  ],
  exports: [PointsComponent, CreatePointComponent],
  providers: [PointService],
})
export class PointsModule {}
