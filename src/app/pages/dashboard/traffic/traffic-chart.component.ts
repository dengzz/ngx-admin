import { delay } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

declare const echarts: any;

const points = [300, 520, 435, 530, 730, 620, 660, 860];

@Component({
  selector: 'ngx-traffic-chart',
  styleUrls: ['./traffic.component.scss'],
  template: `
    <div echarts [options]="option" class="echart"></div>
  `,
})
export class TrafficChartComponent implements AfterViewInit, OnDestroy {

  type = 'month';
  types = ['week', 'month', 'year'];
  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {

      const trafficTheme: any = config.variables.traffic;
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.option = {
         backgroundColor: echarts.bg,
         color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
         tooltip: {
           trigger: 'item',
           formatter: '{a} <br/>{b} : {c} ({d}%)',
         },
         legend: {
           orient: 'vertical',
           left: 'left',
           data: ['USA', 'Germany', 'France', 'Canada', 'Russia'],
           textStyle: {
             color: echarts.textColor,
           },
         },
         series: [
           {
             name: 'Countries',
             type: 'pie',
             radius: '80%',
             center: ['50%', '50%'],
             data: [
               { value: 335, name: 'Germany' },
               { value: 310, name: 'France' },
               { value: 234, name: 'Canada' },
               { value: 135, name: 'Russia' },
               { value: 1548, name: 'USA' },
             ],
             itemStyle: {
               emphasis: {
                 shadowBlur: 10,
                 shadowOffsetX: 0,
                 shadowColor: echarts.itemHoverShadowColor,
               },
             },
             label: {
               normal: {
                 textStyle: {
                   color: echarts.textColor,
                 },
               },
             },
             labelLine: {
               normal: {
                 lineStyle: {
                   color: echarts.axisLineColor,
                 },
               },
             },
           },
         ],
       };
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
