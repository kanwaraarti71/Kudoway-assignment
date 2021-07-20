import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as pollActions from './polls.actions';
import {
  AddPoll,
  AddPollError,
  AddPollSuccess,
  GetAllPollsError,
  GetAllPollsSuccess,
  GetPoll,
  GetPollError,
  GetPollSuccess,
  RemovePoll,
  RemovePollError,
  RemovePollSuccess,
  UpdatePoll,
  UpdatePollError,
  UpdatePollSuccess
} from './polls.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {pollsService} from '../shared/polls.service';
import {poll} from '../shared/poll';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class pollEffects {
  constructor(private actions$: Actions,
              private svc: pollsService) {
  }

  @Effect()
  getAllpolls$: Observable<Action> = this.actions$.pipe(
    ofType(pollActions.GET_pollS),
    switchMap(() => this.svc.findAll()),
    map(heroes => new GetAllPollsSuccess(heroes)),
    catchError((err) => [new GetAllPollsError(err)])
  );

  @Effect()
  getpoll$ = this.actions$.pipe(
    ofType(pollActions.GET_poll),
    map((action: GetPoll) => action.payload),
    switchMap(id => this.svc.findById(id)),
    map(hero => new GetPollSuccess(hero)),
    catchError((err) => [new GetPollError(err)])
  );


  @Effect()
  updatepoll$ = this.actions$.pipe(
    ofType(pollActions.UPDATE_poll),
    map((action: UpdatePoll) => action.payload),
    switchMap(poll => this.svc.update(poll)),
    map(() => new UpdatePollSuccess()),
    catchError((err) => [new UpdatePollError(err)])
  );

  @Effect()
  createpoll$ = this.actions$.pipe(
    ofType(pollActions.CREATE_poll),
    map((action: AddPoll) => action.payload),
    switchMap(newpoll => this.svc.insert(newpoll)),
    map((response) => new AddPollSuccess(response.id)),
    catchError((err) => [new AddPollError(err)])
  );

  @Effect()
  removepoll$ = this.actions$.pipe(
    ofType(pollActions.DELETE_poll),
    map((action: RemovePoll) => action.payload),
    switchMap(id => this.svc.delete(id)),
    map((hero: poll) => new RemovePollSuccess(hero)),
    catchError((err) => [new RemovePollError(err)])
  );
}
