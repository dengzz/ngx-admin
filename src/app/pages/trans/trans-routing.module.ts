import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransComponent } from './trans.component';
import { TranListComponent } from './tran-list/tran-list.component';
import { TranInfoComponent } from './tran-info/tran-info.component';

const routes: Routes = [{
   path: '',
   component: TransComponent,
   children: [{
      path: 'list',
      component: TranListComponent,
   }, {
      path: 'info/:id',
      component: TranInfoComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class TransRoutingModule { }

export const routedComponents = [
   TransComponent,
   TranListComponent,
   TranInfoComponent,
];
