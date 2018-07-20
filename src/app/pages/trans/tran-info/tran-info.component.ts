import { Component } from '@angular/core';

import { TranService } from '../tran.service';
import { LocalDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { ActivatedRoute } from '@angular/router';

@Component({
   templateUrl: './tran-info.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})

export class TranInfoComponent {
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
         type: {
            title: 'Type',
            type: 'html',
         },
         authorizers: {
            title: 'Authorizer',
            type: 'string',
         },
         info: {
            title: 'Info',
            type: 'html',
         }
      },
      pager: {
         display: true,
         perPage: 25,
      },
   };
   assource: LocalDataSource = new LocalDataSource();
   tran: any = {};
   constructor(private route: ActivatedRoute, private service: TranService) {
      const id = this.route.snapshot.paramMap.get('id');
      this.service.getTran(id).subscribe(tran => {
         this.tran = tran;
         this.assource.load(tran.actions);
      });
   }
   ngOnInit() {

   }
}
