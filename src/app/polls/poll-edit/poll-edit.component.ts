import {Component, OnInit} from '@angular/core';
import {poll} from '../shared/poll';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import * as pollActions from '../store/polls.actions';
import {GetPoll, UpdatePoll} from '../store/polls.actions';
import {getpoll} from '../store/polls.reducers';

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.css']
})
export class pollEditComponent implements OnInit {
  title = 'Edit poll';
  poll: poll;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetPoll(+params.id));
    });
    this.store.select(getpoll).subscribe(poll => {
      if (poll != null) {
        this.poll = poll;
      }
    });
  }

  onSave() {
    this.store.dispatch(new UpdatePoll(this.poll));
  }

  
  onBack() {
    this.router.navigate(['/polls']);
  }

}
