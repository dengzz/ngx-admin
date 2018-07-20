import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsComponent } from './contracts.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractInfoComponent } from './contract-info/contract-info.component';

const routes: Routes = [{
   path: '',
   component: ContractsComponent,
   children: [{
      path: 'list',
      component: ContractListComponent,
   },{
      path: 'info/:name',
      component: ContractInfoComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class ContractsRoutingModule { }

export const routedComponents = [
   ContractsComponent,
   ContractListComponent,
   ContractInfoComponent
];
