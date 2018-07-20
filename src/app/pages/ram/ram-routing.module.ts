import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RamComponent } from './ram.component';
import { RamListComponent } from './ram-list/ram-list.component';

const routes: Routes = [{
   path: '',
   component: RamComponent,
   children: [{
      path: 'list',
      component: RamListComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class RamRoutingModule { }

export const routedComponents = [
   RamComponent,
   RamListComponent,
];
