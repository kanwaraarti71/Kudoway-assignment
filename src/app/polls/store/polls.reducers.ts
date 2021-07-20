import * as pollActions from './polls.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {poll} from '../shared/poll';

export interface State {
  data: poll[];
  selected: poll;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all polls actions
     ************************/
    case pollActions.GET_pollS:
      return {
        ...state,
        action: pollActions.GET_pollS,
        done: false,
        selected: null,
        error: null
      };
    case pollActions.GET_pollS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case pollActions.GET_pollS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET poll by id actions
     ************************/
    case pollActions.GET_poll:
      return {
        ...state,
        action: pollActions.GET_poll,
        done: false,
        selected: null,
        error: null
      };
    case pollActions.GET_poll_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case pollActions.GET_poll_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * CREATE poll actions
     ************************/
    case pollActions.CREATE_poll:
      return {
        ...state,
        selected: action.payload,
        action: pollActions.CREATE_poll,
        done: false,
        error: null
      };
    case pollActions.CREATE_poll_SUCCESS:
      {
        const newpoll = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newpoll
        ];
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case pollActions.CREATE_poll_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * UPDATE poll actions
     ************************/
    case pollActions.UPDATE_poll:
      return {
        ...state,
        selected: action.payload,
        action: pollActions.UPDATE_poll,
        done: false,
        error: null
      };
    case pollActions.UPDATE_poll_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case pollActions.UPDATE_poll_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * DELETE poll actions
     ************************/
    case pollActions.DELETE_poll:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: pollActions.DELETE_poll,
          done: false,
          error: null
        };
      }
    case pollActions.DELETE_poll_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case pollActions.DELETE_poll_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getpollsState = createFeatureSelector < State > ('polls');
export const getAllpolls = createSelector(getpollsState, (state: State) => state.data);
export const getpoll = createSelector(getpollsState, (state: State) => {
  if (state.action === pollActions.GET_poll && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getpollsState, (state: State) =>
  state.action === pollActions.DELETE_poll && state.done && !state.error);
export const isCreated = createSelector(getpollsState, (state: State) =>
 state.action === pollActions.CREATE_poll && state.done && !state.error);
export const isUpdated = createSelector(getpollsState, (state: State) =>
 state.action === pollActions.UPDATE_poll && state.done && !state.error);

export const getDeleteError = createSelector(getpollsState, (state: State) => {
  return state.action === pollActions.DELETE_poll
    ? state.error
   : null;
});
export const getCreateError = createSelector(getpollsState, (state: State) => {
  return state.action === pollActions.CREATE_poll
    ? state.error
   : null;
});
export const getUpdateError = createSelector(getpollsState, (state: State) => {
  return state.action === pollActions.UPDATE_poll
    ? state.error
   : null;
});
export const getpollsError = createSelector(getpollsState, (state: State) => {
  return state.action === pollActions.GET_pollS
    ? state.error
   : null;
});
export const getpollError = createSelector(getpollsState, (state: State) => {
  return state.action === pollActions.GET_poll
    ? state.error
   : null;
});
