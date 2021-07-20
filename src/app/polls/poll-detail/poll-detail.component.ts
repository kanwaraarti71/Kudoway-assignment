import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import * as pollActions from '../store/polls.actions';
import {GetPoll} from '../store/polls.actions';
import {Observable} from 'rxjs';
import {poll} from '../shared/poll';
import {getpoll} from '../store/polls.reducers';
import {Platform} from '../shared/platform';

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class pollDetailComponent implements OnInit {
  title = 'Poll Details';
  poll: Observable<poll>;
  platforms: Observable<Platform[]>;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetPoll(+params.id));
    });
    this.poll = this.store.select(getpoll);
  }

}
