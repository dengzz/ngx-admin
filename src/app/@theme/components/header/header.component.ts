import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbSearchService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';

@Component({
   selector: 'ngx-header',
   styleUrls: ['./header.component.scss'],
   templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


   @Input() position = 'normal';

   user: any;

   keyword: string;

   userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

   constructor(private sidebarService: NbSidebarService,
      private menuService: NbMenuService,
      private userService: UserService,
      private analyticsService: AnalyticsService,
      private nbSearchService: NbSearchService,
      private router: Router) {
   }

   ngOnInit() {
      this.userService.getUsers()
         .subscribe((users: any) => this.user = users.nick);
      this.nbSearchService.onSearchSubmit().subscribe((val: any) => {
         this.router.navigate(['/search/' + val.term]);
      });
   }

   toggleSidebar(): boolean {
      this.sidebarService.toggle(true, 'menu-sidebar');
      return false;
   }

   toggleSettings(): boolean {
      this.sidebarService.toggle(false, 'settings-sidebar');
      return false;
   }

   goToHome() {
      this.menuService.navigateHome();
   }

   startSearch() {
      this.analyticsService.trackEvent('startSearch');
   }

   onSearch() {
      console.log(this.keyword);
      if(this.keyword) {
         this.router.navigate(['/search/' + this.keyword]);
      }
   }
}
