import {NgModule} from '@angular/core';
import {pollsService} from './shared/polls.service';
import {pollsRoutedComponents, pollsRoutingModule} from './polls-routing.module';
import {SharedModule} from '../shared/shared.module';
import {PlatformsService} from './shared/platforms.service';

// ngrx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {pollEffects} from './store/polls.effects';
import * as pollReducer from './store/polls.reducers';
import * as platformReducer from './store/platforms.reducers';
import {PlatformEffects} from './store/platforms.effects';

export const reducers: ActionReducerMap<any> = {
  polls: pollReducer.reducer,
  platforms: platformReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    pollsRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([pollEffects, PlatformEffects])
  ],
  declarations: [pollsRoutedComponents],
  providers: [
    pollsService, PlatformsService
  ]
})
export class pollsModule {
}
