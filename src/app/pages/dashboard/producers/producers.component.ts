import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-producers',
  styleUrls: ['./producers.component.scss'],
  templateUrl: './producers.component.html',
})
export class ProducersComponent implements OnDestroy {

  value: Array<any> = [];

  currentTheme: string;
  themeSubscription: any;

  @Input('data')
  set data(value: Array<any>) {
     this.value = value;
  }

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
