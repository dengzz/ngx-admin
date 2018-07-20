import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchData } from '../searchs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { LocalDataSource, ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
   templateUrl: './search-loading.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})
export class SearchLoadingComponent {
   assettings = {
      hideSubHeader: true,
      hideHeader: true,
      actions: {
         columnTitle: 'Actions',
         add: false,
         edit: false,
         delete: false,
         custom: [],
         position: 'left',
      },
      columns: {
         item: {
            title: 'Item',
            type: 'html',
            valuePrepareFunction: (value) => {
               return value.info;
            },
         },
      },
      pager: {
         display: true,
         perPage: 10,
      },
   };
   setActionsSettings() {
      this.assettings = {
         hideSubHeader: true,
         hideHeader: true,
         actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false,
            custom: [],
            position: 'left',
         },
         columns: {
            item: {
               title: 'Item',
               type: 'html',
               valuePrepareFunction: (value) => {
                  return value.info;
               },
            },
         },
         pager: {
            display: true,
            perPage: 10,
         },
      };
   };
   setAccountNamesSettings() {
      this.assettings = {
         hideSubHeader: true,
         hideHeader: true,
         actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false,
            custom: [],
            position: 'left',
         },
         columns: {
            item: {
               title: 'Item',
               type: 'html',
               valuePrepareFunction: (value) => {
                  return `<a href="/#/accounts/info/${value}">${value}</a>`;
               },
            },
         },
         pager: {
            display: true,
            perPage: 10,
         },
      };
   };
   assource: LocalDataSource = new LocalDataSource();
   searchData: SearchData;
   constructor(private route: ActivatedRoute, private service: SearchService, private router: Router, http: HttpClient) {
      const keyword = this.route.snapshot.paramMap.get('keyword');
      this.service.search(keyword).subscribe(searchData => {
         this.searchData = searchData;
         if( searchData.accountNames ){
            if( searchData.accountNames.length == 1 ){
               this.router.navigate(['/accounts/info/' + searchData.accountNames[0].item]);
            } else {
               this.setAccountNamesSettings();
               this.assource = new LocalDataSource(searchData.accountNames);
            }
         } else if ( searchData.txId ) {
            this.router.navigate(['/trans/info/' + searchData.txId]);
         } else {
            this.setActionsSettings();
            this.assource = new ServerDataSource(http, { 
               endPoint: '/api/search/actions?keyword=' + keyword, pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total',
            });
         }
      });
   }
   ngOnInit() {
      this.searchData = new SearchData();
   }
}
