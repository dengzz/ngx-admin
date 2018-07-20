import { Component } from '@angular/core';

import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'ngx-smart-table',
   templateUrl: './block-list.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})
export class BlockListComponent {
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
         id: {
            title: 'Id',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `${(value.substr(0, 5) + '...' + value.substr(value.length - 5))}`;
            },
         },
         blockNum: {
            title: 'Num',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/blocks/info/${value}">${value}</a>`;
            }
         },
         timestamp: {
            title: 'Timestamp',
            type: 'string',
            valuePrepareFunction: (date) => {
               return new Date(date).toLocaleString();
            },
         },
         producer: {
            title: 'Producer',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/accounts/info/${value}">${value}</a>`;
            }
         },
         transactionCount: {
            title: 'Transactions',
            type: 'number'
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
         endPoint: '/api/blocks', pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total'
      });
   }
}
