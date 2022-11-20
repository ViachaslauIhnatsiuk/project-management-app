import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { ISearchResponseItem } from '../models/global-search.models';

@Injectable()
export class GlobalSearchService {
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  public getSearchResponse(query: string): Observable<ISearchResponseItem[]> {
    return this.http.get<ISearchResponseItem[]>('tasksSet', { params: { query } }).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }
}
