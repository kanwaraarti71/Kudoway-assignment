import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {pollListComponent} from './poll-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {pollsService} from '../shared/polls.service';
import {PlatformsService} from '../shared/platforms.service';
import {ExtractNamesPipe} from '../../shared/extract-names.pipe';
import * as pollsReducer from '../store/polls.reducers';
import * as platformsReducer from '../store/platforms.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('pollListComponent', () => {
  let component: pollListComponent;
  let fixture: ComponentFixture<pollListComponent>;
  let mockStore: MockStore<{ polls: pollsReducer.State, platforms: platformsReducer.State }>;
  const initialState = {
    polls: {
      data: [
        {
          id: 1,
          image: 'horizon_zero_dawn.jpg',
          name: 'Horizon Zero Dawn',
          releaseDate: '2017-02-28',
          platforms: [
            2
          ],
          description: 'Horizon Zero Dawn is an action role-playing video poll developed by Guerrilla'
        }, {
          id: 2,
          image: 'destiny2.jpg',
          name: 'Destiny 2',
          releaseDate: '2017-09-06',
          platforms: [
            1,
            2,
            3
          ],
          description: 'Destiny 2 is an online-only multiplayer first-person shooter video poll developed by Bungie'
        }
      ],
      selected: null,
      action: 'GET_pollS',
      done: true
    },
    platforms: {
      data: [
        {
          id: 1,
          name: 'Xbox One'
        },
        {
          id: 2,
          name: 'PlayStation 4'
        },
        {
          id: 3,
          name: 'PC'
        }
      ],
      action: 'GET_PLATFORMS',
      done: true
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        EffectsModule
      ],
      declarations: [
        pollListComponent,
        ExtractNamesPipe
      ],
      providers: [
        pollsService,
        PlatformsService,
        {provide: APP_BASE_HREF, useValue: '/'},
        provideMockStore({initialState})
      ]
    })
      .compileComponents();

    mockStore = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'List of polls'`, () => {
    expect(component.title).toEqual('List of polls');
  });
});
