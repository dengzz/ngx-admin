import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { DashboardService } from './dashboard.service';
import { StatusData, CurrencyStatsData } from './dashboard';
import { ProducerService } from '../../@core/data/producer.service';
import { SignalRService } from '../../@core/data/signalr.service';

interface CardSettings {
   title: string;
   iconClass: string;
   type: string;
   status: string;
}

@Component({
   selector: 'ngx-dashboard',
   styleUrls: ['./dashboard.component.scss'],
   templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
   private alive = true;

   producersCard: CardSettings = {
      title: 'Producers',
      iconClass: 'nb-tables',
      type: 'primary',
      status: '',
   };
   blocksCard: CardSettings = {
      title: 'Blocks',
      iconClass: 'fa fa fa-lock',
      type: 'success',
      status: '',
   };
   transactionsCard: CardSettings = {
      title: 'Transactions',
      iconClass: 'nb-keypad',
      type: 'info',
      status: '',
   };
   accountsCard: CardSettings = {
      title: 'Accounts',
      iconClass: 'nb-person',
      type: 'warning',
      status: '',
   };

   statusCards: CardSettings[];

   producers: Array<any> = [];

   currencyStats: CurrencyStatsData = {
      supply: 0,
      maxSupply: 0,
      percent: 0,
      issuer: ""
   };

   commonStatusCardsSet: CardSettings[] = [
      this.producersCard,
      this.blocksCard,
      this.transactionsCard,
      this.accountsCard,
   ];

   statusCardsByThemes: {
      default: CardSettings[];
      cosmic: CardSettings[];
      corporate: CardSettings[];
   } = {
         default: this.commonStatusCardsSet,
         cosmic: this.commonStatusCardsSet,
         corporate: [
            {
               ...this.producersCard,
               type: 'warning',
            },
            {
               ...this.blocksCard,
               type: 'primary',
            },
            {
               ...this.transactionsCard,
               type: 'danger',
            },
            {
               ...this.accountsCard,
               type: 'secondary',
            },
         ],
      };

   setStatusCards = function (data: StatusData) {
      this.blocksCard.status = data.blockCount;
      this.transactionsCard.status = data.transactionCount;
      this.accountsCard.status = data.accountCount;
      this.currencyStats = data.currencyStats;
   }

   signalRService: SignalRService = null;

   constructor(private themeService: NbThemeService, private dashboardService: DashboardService, private producerService: ProducerService) {
      this.themeService.getJsTheme()
         .pipe(takeWhile(() => this.alive))
         .subscribe(theme => {
            this.statusCards = this.statusCardsByThemes[theme.name];
            this.dashboardService.status().subscribe(data => {
               this.setStatusCards(data);
            });
            this.producerService.getTop().subscribe(producers => {
               this.producers = producers;
               this.producersCard.status = producers.length;
            });
         });
   }

   ngOnInit(): void {
      if (this.signalRService == null) {
         this.signalRService = new SignalRService();
      }
      this.signalRService.off("ramInfoUpdated");
      this.signalRService.on("chainInfoUpdated", data => {
         this.setStatusCards(data);
      });
      this.signalRService.start().then(() => {
      });
   }

   ngOnDestroy() {
      this.alive = false;
      this.signalRService.off("chainInfoUpdated");
      this.signalRService.stop();
   }
}
