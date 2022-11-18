import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IPoint, PointCreate, PointUpdate } from '../models/points.models';

@Injectable()
export class PointService {
  constructor(private http: HttpClient, private store: Store) {}

  public getPointsByTaskId(taskId: string): Observable<IPoint[]> {
    return this.http.get<IPoint[]>(`points/${taskId}`);
  }

  public getPointsByUserId(userId: string): Observable<IPoint[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<IPoint[]>('points', { params });
  }

  public createPoint(point: PointCreate): Observable<IPoint> {
    return this.http.post<IPoint>('points', point);
  }

  public updatePoint(pointId: string, point: PointUpdate): Observable<IPoint> {
    return this.http.patch<IPoint>(`points/${pointId}`, point);
  }

  public deletePoint(pointId: string): Observable<IPoint> {
    return this.http.delete<IPoint>(`points/${pointId}`);
  }
}
