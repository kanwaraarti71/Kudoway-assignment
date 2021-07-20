import {Component, OnInit} from '@angular/core';
import {poll} from '../shared/poll';
import {Platform} from '../shared/platform';
import {PlatformsService} from '../shared/platforms.service';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {AddPoll} from '../store/polls.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.css']
})
export class pollCreateComponent implements OnInit {
  title = 'Create new poll';
  poll: poll = new poll();

  constructor(private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/polls']);
  }
  onSave() {
    this.store.dispatch(new AddPoll(this.poll));
  }

  reset() {
    this.poll.name = '';
  }
}
