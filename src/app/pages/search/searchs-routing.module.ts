import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchsComponent } from './searchs.component';
import { Search404Component } from './search-404/search-404.component';
import { SearchLoadingComponent } from './search-loading/search-loading.component';

const routes: Routes = [{
   path: '',
   component: SearchsComponent,
   children: [{
      path: '404',
      component: Search404Component,
   },{
      path: ':keyword',
      component: SearchLoadingComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class SearchsRoutingModule { }

export const routedComponents = [
   SearchsComponent,
   Search404Component,
   SearchLoadingComponent
];
