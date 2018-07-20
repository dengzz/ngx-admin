import { Component } from '@angular/core';
import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'ngx-smart-table',
   templateUrl: './producer-list.component.html',
   styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ProducerListComponent {
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
         owner: {
            title: 'Owner',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/accounts/info/${value}">${value}</a>`;
            },
         },
         produceBlocks: {
            title: 'Produce Blocks',
            type: 'number',
         },
         unpaidBlocks: {
            title: 'Unpaid Blocks',
            type: 'string',
         },
         unpaidRewards: {
            title: 'Unpaid Rewards',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<span class="text-warning">${value}</span>`;
            },
         },
         totalVotes: {
            title: 'Total Votes',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<span class="text-warning">${value}%</span>`;
            },
         },
         url: {
            title: 'Url',
            type: 'html',
            valuePrepareFunction: (value) => {
               if (value) {
                  if (value.length < 100) {
                     return `<a target="_blank" href="${value}" target="_blank">${value}</a>`;
                  } else {
                     return `<a href="${value}" title="${value}" target="_blank">${(value.substr(0, 5) + '...' + value.substr(value.length - 5))}</a>`;
                  }
               }
            },
         },
         lastClaim: {
            title: 'Last Claim',
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
         endPoint: '/api/producers', pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total'
      });
   }
}
