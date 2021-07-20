import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {poll} from '../shared/poll';
import {Observable} from 'rxjs';
import * as pollActions from '../store/polls.actions';
import {getAllpolls} from '../store/polls.reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class pollListComponent implements OnInit {
  title = 'List of Polls';
  polls: Observable<poll[]>;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() {
    debugger;
    const username = sessionStorage.getItem("username");
    if(username === null){
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    
    this.polls = this.store.select(getAllpolls);
  }
  
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this poll?')) {
      this.store.dispatch(new pollActions.RemovePoll(id));
    }
  }

  LogOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
