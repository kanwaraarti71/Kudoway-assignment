import {Action} from '@ngrx/store';
import {poll} from '../shared/poll';
import {Platform} from '../shared/platform';

export const GET_PLATFORMS = '[ALL] Platforms';
export const GET_PLATFORMS_SUCCESS = '[ALL] Platforms Success';
export const GET_PLATFORMS_ERROR = '[ALL] Platforms Error';

/****************************************
 * GET all the platforms
 ****************************************/
export class GetAllPlatforms implements Action {
  readonly type = GET_PLATFORMS;
}

export class GetAllPlatformsSuccess implements Action {
  readonly type = GET_PLATFORMS_SUCCESS;

  constructor(public payload: Platform[]) {
  }
}

export class GetAllPlatformsError implements Action {
  readonly type = GET_PLATFORMS_ERROR;

  constructor(public payload: Error) {
  }
}
