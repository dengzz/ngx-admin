import { Component } from '@angular/core';

import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'ngx-smart-table',
   templateUrl: './account-list.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})
export class AccountListComponent {
   settings = {
      hideSubHeader: true,
      actions: {
         columnTitle: 'Actions',
         add: false,
         edit: false,
         delete: false,
         custom: [],
         position: 'left',
      },
      columns: {
         name: {
            title: 'Name',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/accounts/info/${value}">${value}</a>`;
            },
         },
         creator: {
            title: 'Creator',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/accounts/info/${value}">${value}</a>`;
            },
         },
         createDate: {
            title: 'Timestamp',
            type: 'string',
            valuePrepareFunction: (date) => {
               return new Date(date).toLocaleString();
            },
         },
      },
      pager: {
         display: true,
         perPage: 25,
      },
   };
   source: ServerDataSource;
   constructor(http: HttpClient) {
      this.source = new ServerDataSource(http, {
         endPoint: '/api/accounts', pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total',
      });
   }
}
