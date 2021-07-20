import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {pollsComponent} from './polls.component';
import {pollsService} from './shared/polls.service';
import {PlatformsService} from './shared/platforms.service';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as pollsReducer from './store/polls.reducers';
import * as platformsReducer from './store/platforms.reducers';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('pollsComponent', () => {
  let component: pollsComponent;
  let fixture: ComponentFixture<pollsComponent>;
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
        EffectsModule
      ],
      declarations: [
        pollsComponent
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
    fixture = TestBed.createComponent(pollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
