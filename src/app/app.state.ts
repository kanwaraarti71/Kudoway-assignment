import * as frompolls from './polls/store/polls.reducers';
import * as fromPlatforms from './polls/store/platforms.reducers';

export interface AppState {
  polls: frompolls.State;
  platforms: fromPlatforms.State;
}
