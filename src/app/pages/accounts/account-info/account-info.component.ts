import { Component } from '@angular/core';

import { AccountService } from '../account.service';
import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
   templateUrl: './account-info.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})

export class AccountInfoComponent {
   assettings = {
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
         txId: {
            title: 'TxId',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/trans/info/${value}">${(value.substr(0, 5) + '...' + value.substr(value.length - 5))}</a>`;
            },
         },
         createDate: {
            title: 'Timestamp',
            type: 'string',
            valuePrepareFunction: (date) => {
                  return new Date(date).toLocaleString();
            },
         },
         type: {
            title: 'Type',
            type: 'html',
         },
         info: {
            title: 'Info',
            type: 'html',
         }
      },
      pager: {
         display: true,
         perPage: 10,
      },
   };
   assource: ServerDataSource;
   account: any = {};
   creator: any = {};
   constructor(private route: ActivatedRoute, private service: AccountService, private http: HttpClient) {
      const name = this.route.snapshot.paramMap.get('name');
      this.service.getAccount(name).subscribe(account => {
         this.account = account;
      });
      this.service.getCreator(name).subscribe(creator => {
         this.creator = creator;
      });
      this.assource = new ServerDataSource(http, { 
         endPoint: '/api/accounts/' + name + '/actions', pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total' 
      });
   }
   ngOnInit() {

   }
}
