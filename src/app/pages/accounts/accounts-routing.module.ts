import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './accounts.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountInfoComponent } from './account-info/account-info.component';

const routes: Routes = [{
   path: '',
   component: AccountsComponent,
   children: [{
      path: 'list',
      component: AccountListComponent,
   },{
      path: 'info/:name',
      component: AccountInfoComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class AccountsRoutingModule { }

export const routedComponents = [
   AccountsComponent,
   AccountListComponent,
   AccountInfoComponent
];
