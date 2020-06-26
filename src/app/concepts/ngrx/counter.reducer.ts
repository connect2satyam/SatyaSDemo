import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

// https://ngrx.io/guide/store

const myCounterReducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, state => 0),
);

export function counterReducer(state, action) {
  return myCounterReducer(state, action);
}
