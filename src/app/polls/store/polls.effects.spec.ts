import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {pollEffects} from './polls.effects';
import {cold} from 'jasmine-marbles';

import {of, throwError} from 'rxjs';
import {
  AddpollError,
  AddpollSuccess,
  CREATE_poll,
  DELETE_poll,
  GET_poll,
  GET_pollS,
  GetAllpollsError,
  GetAllpollsSuccess,
  GetpollError,
  GetpollSuccess,
  RemovepollError,
  RemovepollSuccess,
  UPDATE_poll,
  UpdatepollError,
  UpdatepollSuccess
} from './polls.actions';
import {poll} from '../shared/poll';

const MOCK_DATA: poll[] = [
  {
    id: 1,
    image: 'picture.jpg',
    name: 'poll 1',
    releaseDate: new Date(),
    platforms: [1],
    description: 'Descripion of poll 1'
  }, {
    id: 2,
    image: 'picture2.jpg',
    name: 'poll 2',
    releaseDate: new Date(),
    platforms: [2],
    description: 'Descripion of poll 2'
  }
];

describe('pollEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        pollEffects
      ]
    });
    service = jasmine.createSpyObj('svc', ['findAll', 'findById', 'update', 'insert', 'delete']);
  });

  describe('getAllpolls$', () => {
    it('should return a GET_pollS_SUCCESS action, with the polls, on success', () => {
      service.findAll.and.returnValue(of(MOCK_DATA));
      const source = cold('a', {a: {type: GET_pollS}});
      const effects = new pollEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetAllpollsSuccess(MOCK_DATA)});

      expect(effects.getAllpolls$).toBeObservable(expected);
    });

    it('should return a GET_pollS_ERROR action, with the error', () => {
      const error = new Error('Error loading polls');
      service.findAll.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_pollS}});
      const effects = new pollEffects(new Actions(source), service);

      effects.getAllpolls$.subscribe(result => {
        expect(result).toEqual(new GetAllpollsError(error));
      });
    });
  });

  describe('getpoll$', () => {
    it('should return a GET_poll_SUCCESS action, with the poll found, on success', () => {
      const data = MOCK_DATA[0];
      service.findById.and.returnValue(of(data));
      const source = cold('a', {a: {type: GET_poll}});
      const effects = new pollEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetpollSuccess(data)});

      expect(effects.getpoll$).toBeObservable(expected);
    });

    it('should return a GET_poll_ERROR action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the poll with id ${data.id}`);
      service.findById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_poll}});
      const effects = new pollEffects(new Actions(source), service);

      effects.getpoll$.subscribe(result => {
        expect(result).toEqual(new GetpollError(error));
      });
    });
  });

  describe('updatepoll$', () => {
    it('should return a UPDATE_poll_SUCCESS action, without any data', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      service.update.and.returnValue(of(data));
      const source = cold('a', {a: {type: UPDATE_poll}});
      const effects = new pollEffects(new Actions(source), service);
      const expected = cold('a', {a: new UpdatepollSuccess()});

      expect(effects.updatepoll$).toBeObservable(expected);
    });

    it('should return a UPDATE_poll_ERROR action, with the error', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      const error = new Error(`Error updating the poll with id ${data.id}`);
      service.update.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: UPDATE_poll}});
      const effects = new pollEffects(new Actions(source), service);

      effects.updatepoll$.subscribe(result => {
        expect(result).toEqual(new UpdatepollError(error));
      });
    });
  });

  describe('createpoll$', () => {
    it('should return a CREATE_poll_SUCCESS action, with the poll inserted, on success', () => {
      const data = {
        id: 3,
        image: 'picture3.jpg',
        name: 'poll 3',
        releaseDate: new Date(),
        platforms: [1, 2],
        description: 'Descripion of poll 3'
      };
      service.insert.and.returnValue(of(data));
      const source = cold('a', {a: {type: CREATE_poll}});
      const effects = new pollEffects(new Actions(source), service);
      const expected = cold('a', {a: new AddpollSuccess(data.id)});

      expect(effects.createpoll$).toBeObservable(expected);
    });

    it('should return a CREATE_poll_ERROR action, with the error', () => {
      const data = {
        id: 3,
        image: 'picture3.jpg',
        name: 'poll 3',
        releaseDate: new Date(),
        platforms: [1, 2],
        description: 'Descripion of poll 3'
      };
      const error = new Error(`Error adding new poll with id ${data.id}`);
      service.insert.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: CREATE_poll}});
      const effects = new pollEffects(new Actions(source), service);

      effects.createpoll$.subscribe(result => {
        expect(result).toEqual(new AddpollError(error));
      });
    });
  });

  describe('removepoll$', () => {
    it('should return a DELETE_poll_SUCCESS action, with the poll deleted, on success', () => {
      const data = MOCK_DATA[1];
      service.delete.and.returnValue(of(data));
      const source = cold('a', {a: {type: DELETE_poll}});
      const effects = new pollEffects(new Actions(source), service);
      const expected = cold('a', {a: new RemovepollSuccess(data)});

      expect(effects.removepoll$).toBeObservable(expected);
    });

    it('should return a DELETE_poll_ERROR action, with the error', () => {
      const data = MOCK_DATA[1];
      const error = new Error(`Error removing the poll with id ${data.id}`);
      service.delete.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: DELETE_poll}});
      const effects = new pollEffects(new Actions(source), service);

      effects.removepoll$.subscribe(result => {
        expect(result).toEqual(new RemovepollError(error));
      });
    });
  });
});
