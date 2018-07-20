/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { SignalRService } from './@core/data/signalr.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProducerService } from './@core/data/producer.service';
import { BlockService } from './@core/data/blocks.service';
import { TranService } from './pages/trans/tran.service';
import { AccountService } from './pages/accounts/account.service';
import { SearchService } from './pages/search/search.service';
import { RamService } from './pages/ram/ram.service';
import { DashboardService } from './pages/dashboard/dashboard.service';
import { RouteReuseStrategy } from '@angular/router';
import { SimpleReuseStrategy } from "./@router/SimpleReuseStrategy";
import { ContractService } from './pages/contracts/contract.service';
import { TokenService } from './pages/tokens/token.service';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      NgbModule.forRoot(),
      ThemeModule.forRoot(),
      CoreModule.forRoot(),
   ],
   bootstrap: [AppComponent],
   providers: [
      AccountService,
      TranService,
      ProducerService,
      BlockService,
      SearchService,
      RamService,
      ContractService,
      TokenService,
      DashboardService,
      SignalRService,
      { provide: APP_BASE_HREF, useValue: '/' },
      { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy }
   ],
})
export class AppModule {
}
