import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokensComponent } from './tokens.component';
import { TokenListComponent } from './token-list/token-list.component';

const routes: Routes = [{
   path: '',
   component: TokensComponent,
   children: [{
      path: 'list',
      component: TokenListComponent,
   }],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class TokensRoutingModule { }

export const routedComponents = [
   TokensComponent,
   TokenListComponent,
];
