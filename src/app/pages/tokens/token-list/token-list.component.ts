import { Component } from '@angular/core';

import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'ngx-smart-table',
   styleUrls: ['./token-list.component.scss'],
   templateUrl: './token-list.component.html',
})
export class TokenListComponent {
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
         code: {
            title: 'Code',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/contracts/info/${value}">${value}</a>`;
            },
         },
         name: {
            title: 'Name',
            type: 'string',
         },
         createDate: {
            title: 'Timestamp',
            type: 'string',
            valuePrepareFunction: (date) => {
               return new Date(date).toLocaleString();
            },
         },
         issuer: {
            title: 'Issuser',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/accounts/info/${value}">${value}</a>`;
            },
         },
         maxSupply: {
            title: 'Max Supply',
            type: 'string',
         },
         supply: {
            title: 'Supply',
            type: 'string',
         },
         percent: {
            title: 'Percent',
            type: 'number',
         },
      },
      pager: {
         display: true,
         perPage: 25,
      },
   };
   queryParams: any = {};
   source: ServerDataSource;

   onSearch() {
      console.log(this.queryParams);
      this.router.navigate(['/tokens/list'], { queryParams: this.queryParams });
   }

   constructor(http: HttpClient, private route: ActivatedRoute, private router: Router) {
      const issuer = this.route.snapshot.queryParamMap.get('issuer');
      const name = this.route.snapshot.queryParamMap.get('name');
      this.queryParams = { issuer: issuer, name: name };
      const urlTree = this.router.createUrlTree(['/api/tokens'], { queryParams: this.queryParams });
      const url = this.router.serializeUrl(urlTree);
      this.source = new ServerDataSource(http, {
         endPoint: url, pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total',
      });
   }
}
