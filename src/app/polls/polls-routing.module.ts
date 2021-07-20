import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
// components
import {pollsComponent} from './polls.component';
import {pollListComponent} from './poll-list/poll-list.component';
import {pollCreateComponent} from './poll-create/poll-create.component';
import {pollDetailComponent} from './poll-detail/poll-detail.component';
import {pollEditComponent} from './poll-edit/poll-edit.component';

export const pollsRoutes: Routes = [{
  path: '',
  component: pollsComponent,
  children: [
    {path: '', component: pollListComponent},
    {path: 'detail/:id', component: pollDetailComponent},
    {path: 'create', component: pollCreateComponent},
    {path: 'edit/:id', component: pollEditComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(pollsRoutes)
  ],
  exports: [RouterModule]
})
export class pollsRoutingModule {
}

export const pollsRoutedComponents = [
  pollsComponent,
  pollListComponent,
  pollDetailComponent,
  pollCreateComponent,
  pollEditComponent
];
