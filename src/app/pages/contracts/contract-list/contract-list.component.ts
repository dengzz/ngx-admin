import { Component } from '@angular/core';

import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'ngx-smart-table',
   templateUrl: './contract-list.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})
export class ContractListComponent {
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
         account: {
            title: 'Name',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/contracts/info/${value}">${value}</a>`;
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
      attr: {
         class: 'table table-sm table-borderless',
     },
   };
   source: ServerDataSource;
   constructor(http: HttpClient) {
      this.source = new ServerDataSource(http, { 
         endPoint: '/api/contracts', pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total',
      });
  }
}
