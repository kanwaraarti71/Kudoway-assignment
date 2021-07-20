import {Action} from '@ngrx/store';
import {poll} from '../shared/poll';

export const GET_pollS = '[ALL] polls';
export const GET_pollS_SUCCESS = '[ALL] polls Success';
export const GET_pollS_ERROR = '[ALL] polls Error';

export const GET_poll = '[GET] poll';
export const GET_poll_SUCCESS = '[GET] polls Success';
export const GET_poll_ERROR = '[GET] polls Error';

export const CREATE_poll = '[CREATE] poll';
export const CREATE_poll_SUCCESS = '[CREATE] poll Success';
export const CREATE_poll_ERROR = '[CREATE] poll Error';

export const DELETE_poll = '[DELETE] poll';
export const DELETE_poll_SUCCESS = '[DELETE] poll Success';
export const DELETE_poll_ERROR = '[DELETE] poll Error';

export const UPDATE_poll = '[UPDATE] poll';
export const UPDATE_poll_SUCCESS = '[UPDATE] poll Success';
export const UPDATE_poll_ERROR = '[UPDATE] poll Error';

export class GetAllPolls implements Action {
  readonly type = GET_pollS;
}

export class GetAllPollsSuccess implements Action {
  readonly type = GET_pollS_SUCCESS;

  constructor(public payload: poll[]) {
  }
}

export class GetAllPollsError implements Action {
  readonly type = GET_pollS_ERROR;

  constructor(public payload: Error) {
  }
}

export class GetPoll implements Action {
  readonly type = GET_poll;

  constructor(public payload: number) {
  }
}

export class GetPollSuccess implements Action {
  readonly type = GET_poll_SUCCESS;

  constructor(public payload: poll) {
  }
}

export class GetPollError implements Action {
  readonly type = GET_poll_ERROR;

  constructor(public payload: Error) {
  }
}

export class AddPoll implements Action {
  readonly type = CREATE_poll;

  constructor(public payload: poll) {
  }
}

export class AddPollSuccess implements Action {
  readonly type = CREATE_poll_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddPollError implements Action {
  readonly type = CREATE_poll_ERROR;

  constructor(public payload: Error) {
  }
}

export class RemovePoll implements Action {
  readonly type = DELETE_poll;

  constructor(public payload: number) {
  }
}

export class RemovePollSuccess implements Action {
  readonly type = DELETE_poll_SUCCESS;

  constructor(public payload: poll) {
  }
}

export class RemovePollError implements Action {
  readonly type = DELETE_poll_ERROR;

  constructor(public payload: Error) {
  }
}

export class UpdatePoll implements Action {
  readonly type = UPDATE_poll;

  constructor(public payload: poll) {
  }
}

export class UpdatePollSuccess implements Action {
  readonly type = UPDATE_poll_SUCCESS;
}

export class UpdatePollError implements Action {
  readonly type = UPDATE_poll_ERROR;

  constructor(public payload: Error) {
  }
}
