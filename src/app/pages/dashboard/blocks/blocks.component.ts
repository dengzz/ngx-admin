import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import { BlockService } from '../../../@core/data/blocks.service';

@Component({
  selector: 'ngx-blocks',
  styleUrls: ['./blocks.component.scss'],
  templateUrl: './blocks.component.html',
})
export class BlocksComponent implements OnInit, OnDestroy {

  blocks: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(private blockService: BlockService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit() {

    this.blockService.getTopBlocks()
      .subscribe((blocks: any) => {
        this.blocks = blocks.list;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
