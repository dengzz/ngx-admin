import { Component } from '@angular/core';

import { BlockService } from '../../../@core/data/blocks.service';
import { LocalDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { ActivatedRoute } from '@angular/router';

@Component({
   templateUrl: './block-info.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})

export class BlockInfoComponent {
   txsettings = {
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
            id: 'id',
            title: 'Id',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/trans/info/${value}">${(value.substr(0, 5) + '...' + value.substr(value.length - 5))}</a>`;
            },
         },
         authorizers:{
            title: 'Authorizers',
            type: 'html',
            valuePrepareFunction: (value) => {
               return `<a href="/#/accounts/info/${value}">${value}</a>`;
            },
         },
         action_count: {
            title: 'Actions',
            type: 'string',
         },
         status: {
            title: 'Status',
            type: 'string',
         },
         transfer_quantity: {
            title: 'Quantity',
            type: 'string',
         },
         transfer_fee: {
            title: 'Fee',
            type: 'string',
         },
         cpu_usage_us: {
            title: 'Cpu Usage',
            type: 'number',
         },
         net_usage_words: {
            title: 'Net Usage',
            type: 'number',
         },
      },
      pager: {
         display: true,
         perPage: 250,
      },
   };
   txsource: LocalDataSource = new LocalDataSource();
   block: any = {};
   constructor(private route: ActivatedRoute, private service: BlockService) {
      let id = this.route.snapshot.paramMap.get('id');
      this.service.getBlock(parseInt(id)).subscribe(block => {
         block.formated_id = block.id.substr(0, 8) + '...' + block.id.substr(block.id.length - 8);
         block.formated_previous = block.previous.substr(0, 8) + '...' + block.previous.substr(block.previous.length - 8);
         block.formated_transaction_mroot = block.transaction_mroot.substr(0, 8) + '...' + block.transaction_mroot.substr(block.transaction_mroot.length - 8);
         block.formated_action_mroot = block.action_mroot.substr(0, 8) + '...' + block.action_mroot.substr(block.action_mroot.length - 8);
         block.formated_producer_signature = block.producer_signature.substr(0, 8) + '...' + block.producer_signature.substr(block.producer_signature.length - 8);
         this.block = block;
         this.txsource.load(block.transactions);
      });
   }
   ngOnInit() {
   
   }
}