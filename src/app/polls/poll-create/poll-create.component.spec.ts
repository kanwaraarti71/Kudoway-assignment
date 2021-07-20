import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { pollCreateComponent } from './poll-create.component';
import {pollsService} from '../shared/polls.service';
import {PlatformsService} from '../shared/platforms.service';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

describe('pollCreateComponent', () => {
  let component: pollCreateComponent;
  let fixture: ComponentFixture<pollCreateComponent>;

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
        pollCreateComponent
      ],
      providers: [
        pollsService,
        PlatformsService,
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pollCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Create new poll'`, () => {
    expect(component.title).toEqual('Create new poll');
  });
});
