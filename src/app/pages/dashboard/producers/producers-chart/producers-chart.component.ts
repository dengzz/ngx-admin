import { delay } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
   selector: 'ngx-producers-chart',
   styleUrls: ['./producers-chart.component.scss'],
   template: `
    <div echarts [options]="option" class="echart"></div>
  `,
})
export class ProducersChartComponent implements AfterViewInit, OnDestroy {

   value: any;
   option: any;
   config: any = {};
   themeSubscription: any;

   @Input('chartValue')
   set chartValue(value: Array<any>) {
      this.value = [];
      value.forEach(val => {
         this.value.push({ value: val.totalVotes, name: val.owner });
      });
      if (this.config.variables) {
         this.setOption(this.config);
      }
   }

   setOption = function (config: any) {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;
      this.option = {
         backgroundColor: echarts.bg,
         color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
         tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
         },
         series: [
            {
               name: 'Countries',
               type: 'pie',
               radius: '80%',
               center: ['50%', '50%'],
               data: this.value,
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
   };

   constructor(private theme: NbThemeService) {

   }

   ngAfterViewInit(): void {
      this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
         this.config = config;
         this.setOption(this.config);
      });
   }

   ngOnDestroy() {
      this.themeSubscription.unsubscribe();
   }
}
