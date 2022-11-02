import { createFeatureSelector } from '@ngrx/store';
import { IBoardsState } from '../models/boards.models';

const selectBoards = createFeatureSelector<IBoardsState>('boards');

export { selectBoards };
