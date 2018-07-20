import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { RamService } from '../ram.service';
import { SignalRService } from '../../../@core/data/signalr.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'ngx-smart-table',
   styleUrls: ['./ram-list.component.scss'],
   templateUrl: './ram-list.component.html',
})
export class RamListComponent implements OnInit, OnDestroy {
   queryParams: any = {};
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
         createDate: {
            title: 'Timestamp',
            type: 'string',
            valuePrepareFunction: (date) => {
               return new Date(date).toLocaleString();
            },
         },
         info: {
            title: 'Info',
            type: 'html'
         },
      },
      pager: {
         display: true,
         perPage: 25,
      },
   };
   source: ServerDataSource;
   status: any = {};
   signalRService: SignalRService = null;
   setStatus(ramService: RamService) {
      ramService.status().subscribe(status => {
         this.status = status;
      });
   }
   onSearch() {
      console.log(this.queryParams);
      this.router.navigate(['/ram/list'], { queryParams: this.queryParams });
   }
   constructor(http: HttpClient, ramService: RamService, private route: ActivatedRoute, private router: Router) {
      const maxQuantity = this.route.snapshot.queryParamMap.get('maxQuantity');
      const minQuantity = this.route.snapshot.queryParamMap.get('minQuantity');
      const name = this.route.snapshot.queryParamMap.get('name');
      this.queryParams = { maxQuantity: maxQuantity, minQuantity: minQuantity, name: name };
      const urlTree = this.router.createUrlTree(['/api/ram'], { queryParams: this.queryParams });
      const url = this.router.serializeUrl(urlTree);
      this.source = new ServerDataSource(http, {
         endPoint: url, pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total',
      });
      this.setStatus(ramService);
   }
   ngOnInit(): void {
      if (this.signalRService == null) {
         this.signalRService = new SignalRService();
      }
      this.signalRService.off("chainInfoUpdated");
      this.signalRService.on("ramInfoUpdated", data => {
         this.status = data;
      });
      this.signalRService.start().then(() => { });
   }
   ngOnDestroy(): void {
      this.signalRService.off("ramInfoUpdated");
      this.signalRService.stop();
   }
}
