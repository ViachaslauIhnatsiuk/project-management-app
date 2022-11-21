import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { CreatePointComponent } from './components/create-point/create-point.component';
import { PointsComponent } from './components/points/points.component';
import { PointFormComponent } from './components/point-form/point-form.component';
import { PointComponent } from './components/point/point.component';
import { PointService } from './services/point.service';
import { pointsReducer } from './store/reducers/points.reducers';
import { PointsEffects } from './store/effects/points.effects';

@NgModule({
  declarations: [CreatePointComponent, PointsComponent, PointComponent, PointFormComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('points', pointsReducer),
    EffectsModule.forFeature([PointsEffects]),
    TranslateModule,
  ],
  exports: [PointsComponent, CreatePointComponent],
  providers: [PointService],
})
export class PointsModule {}
