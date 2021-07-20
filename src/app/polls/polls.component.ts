import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from '../app.state';
import {GetAllPolls} from './store/polls.actions';
import {
  getCreateError, getDeleteError, getpollsError, getUpdateError, isCreated, isDeleted,
  isUpdated
} from './store/polls.reducers';
import {GetAllPlatforms} from './store/platforms.actions';

@Component({
  selector: 'app-polls',
  template: `
    <router-outlet></router-outlet>`,
  styleUrls: ['./polls.component.css']
})
export class pollsComponent implements OnInit {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    console.log('... Initializing Heroes component');
    this.store.dispatch(new GetAllPolls());
    this.store.dispatch(new GetAllPlatforms());

    // subscriptions when success or error action
    this.store.select(getpollsError).subscribe((error) => this.loadingError(error));
    this.store.select(isDeleted).subscribe((done) => {
      this.actionSuccess(done, 'The poll was deleted successfully!!!');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the poll');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done, 'The poll was updated successfully!!!');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the poll');
    });
    this.store.select(isCreated).subscribe((done) => {
      this.actionSuccess(done, 'The poll was created successfully!!!');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the poll');
    });
  }

  /**
   * Display error message if load of polls fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of polls');
    }
  }

  /**
   * Display success message after execute specific action over the poll
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      alert(message);
      this.router.navigate(['/polls']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }
}
