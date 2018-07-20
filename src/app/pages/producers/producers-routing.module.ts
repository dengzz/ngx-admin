import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducersComponent } from './producers.component';
import { ProducerListComponent } from './producer-list/producer-list.component';

const routes: Routes = [{
  path: '',
  component: ProducersComponent,
  children: [{
    path: 'list',
    component: ProducerListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProducersRoutingModule { }

export const routedComponents = [
  ProducersComponent,
  ProducerListComponent,
];
