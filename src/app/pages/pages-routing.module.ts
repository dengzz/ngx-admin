import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
   path: '',
   component: PagesComponent,
   children: [{
      path: 'dashboard',
      component: DashboardComponent,
   }, {
      path: 'producers',
      loadChildren: './producers/producers.module#ProducersModule',
   }, {
      path: 'blocks',
      loadChildren: './blocks/blocks.module#BlocksModule',
   }, {
      path: 'trans',
      loadChildren: './trans/trans.module#TransModule',
   }, {
      path: 'accounts',
      loadChildren: './accounts/accounts.module#AccountsModule',
   }, {
      path: 'search',
      loadChildren: './search/searchs.module#SearchsModule',
   }, {
      path: 'ram',
      loadChildren: './ram/ram.module#RamModule',
   }, {
      path: 'contracts',
      loadChildren: './contracts/contracts.module#ContractsModule',
   }, {
      path: 'tokens',
      loadChildren: './tokens/tokens.module#TokensModule',
   }, {
      path: 'miscellaneous',
      loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
   }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
   }, {
      path: '**',
      component: NotFoundComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class PagesRoutingModule {
}
