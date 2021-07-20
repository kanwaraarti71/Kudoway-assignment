import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {pollDetailComponent} from './poll-detail.component';
import {ExtractNamesPipe} from '../../shared/extract-names.pipe';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {PlatformsService} from '../shared/platforms.service';
import {pollsService} from '../shared/polls.service';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, Store} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as pollsReducer from '../store/polls.reducers';
import * as platformsReducer from '../store/platforms.reducers';

export const reducers: ActionReducerMap<any> = {
  polls: pollsReducer.reducer
};

describe('pollDetailComponent', () => {
  let component: pollDetailComponent;
  let fixture: ComponentFixture<pollDetailComponent>;
  let mockStore: MockStore<{ polls: pollsReducer.State, platforms: platformsReducer.State }>;
  const initialState = {
    polls: {
      data: [],
      selected: {
        id: 1,
        image: 'horizon_zero_dawn.jpg',
        name: 'Horizon Zero Dawn',
        releaseDate: '2017-02-28',
        platforms: [
          2
        ],
        description: 'Horizon Zero Dawn is an action role-playing video poll developed by Guerrilla polls'
      },
      action: 'GET_poll',
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
        EffectsModule.forRoot([])
      ],
      declarations: [
        pollDetailComponent,
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
    fixture = TestBed.createComponent(pollDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'poll Details'`, () => {
    expect(component.title).toEqual('poll Details');
  });
});
