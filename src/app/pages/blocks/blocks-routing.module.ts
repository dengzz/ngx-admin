import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlocksComponent } from './blocks.component';
import { BlockListComponent } from './block-list/block-list.component';
import { BlockInfoComponent } from './block-info/block-info.component';

const routes: Routes = [{
   path: '',
   component: BlocksComponent,
   children: [{
      path: 'list',
      component: BlockListComponent,
   },{
      path: 'info/:id',
      component: BlockInfoComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class BlocksRoutingModule { }

export const routedComponents = [
   BlocksComponent,
   BlockListComponent,
   BlockInfoComponent
];
