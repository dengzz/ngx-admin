import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { ContractService } from '../contract.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   templateUrl: './contract-info.component.html',
   styles: [`
   nb-card {
         transform: translate3d(0, 0, 0);
      }
   `],
})

export class ContractInfoComponent {
   contract: any = {};
   constructor(private route: ActivatedRoute, private service: ContractService, private http: Http) {
      const name = this.route.snapshot.paramMap.get('name');
      this.service.getContract(name).subscribe(contract => {
         this.contract = contract;
      });
   }
   ngOnInit() {

   }
}
