import {async, TestBed, inject, getTestBed} from '@angular/core/testing';

import {pollsService} from './polls.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {poll} from './poll';

const BASE_URL = 'http://localhost:3000/api/polls';
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

describe('pollsService', () => {
  let injector: TestBed;
  let service: pollsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [pollsService]
    });

    injector = getTestBed();
    service = injector.get(pollsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([pollsService], (svg: pollsService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all polls', async(() => {
    service
      .findAll()
      .subscribe((data: poll[]) => {
        expect(data.length).toBe(2);
        expect(data[0]).toBe(MOCK_DATA[0]);
        expect(data[1]).toBe(MOCK_DATA[1]);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

  it('should get poll by id', async(() => {
    const id = 1;
    service
      .findById(id)
      .subscribe((response: poll) => {
        expect(response).toBe(MOCK_DATA[0]);
      });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

  it('should insert new poll', async(() => {
    const newpoll = {
      id: 3,
      image: 'picture3.jpg',
      name: 'poll 3',
      releaseDate: new Date(),
      platforms: [1, 2],
      description: 'Descripion of poll 3'
    };
    service
      .insert(newpoll)
      .subscribe((successResult) => {
        expect(successResult).toBe(newpoll);
      });

    const req: TestRequest = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(newpoll);
  }));

  it('should save updates to an existing poll', async(() => {
    const poll = {
      ...MOCK_DATA[1],
      name: 'poll 2 changed',
      image: 'imageChanged.jpg'
    };
    const id = poll.id;
    service
      .update(poll)
      .subscribe((successResult) => {
        expect(successResult).toBe(poll);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(poll);
  }));

  it('should delete an existing poll', async(() => {
    const data = MOCK_DATA[1];
    service
      .delete(data.id)
      .subscribe((successResult) => {
        expect(successResult).toBe(data);
      }, (errorResult) => {
        throw(errorResult);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${data.id}`);
    expect(req.request.method).toBe('DELETE');
  }));
});
