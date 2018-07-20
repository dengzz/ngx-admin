import { delay } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

declare const echarts: any;

@Component({
   selector: 'ngx-currency',
   styleUrls: ['./currency.component.scss'],
   template: `
    <nb-card size="xsmall" class="solar-card">
      <nb-card-header>Currency Stats</nb-card-header>
      <nb-card-body>
        <div echarts [options]="option" class="echart">
        </div>
        <div class="info">
          <div class="value">{{ supply }}</div>
          <div class="details"><span>out of</span></div>
          <div class="value">{{ maxSupply }}</div>
          <div class="details"><span>issued by </span> <a href="/#/accounts/info/{{ issuer }}">{{ issuer }}</a></div>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class CurrencyComponent implements AfterViewInit, OnDestroy {

   private value = 0;
   @Input() supply: number;
   @Input() maxSupply: number;
   @Input() issuer: string;
   @Input('chartValue')
   set chartValue(value: number) {
      this.value = value;
      if(this.config.variables){
         this.setOption(this.config);
      }
   }

   option: any = {};
   config: any = {};
   themeSubscription: any;

   setOption = function (config: any) {
      const solarTheme: any = config.variables.solar;
      this.option = Object.assign({}, {
         tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
         },
         series: [
            {
               name: ' ',
               clockWise: true,
               hoverAnimation: false,
               type: 'pie',
               center: ['45%', '50%'],
               radius: solarTheme.radius,
               data: [
                  {
                     value: this.value,
                     name: ' ',
                     label: {
                        normal: {
                           position: 'center',
                           formatter: '{d}%',
                           textStyle: {
                              fontSize: '22',
                              fontFamily: config.variables.fontSecondary,
                              fontWeight: '600',
                              color: config.variables.fgHeading,
                           },
                        },
                     },
                     tooltip: {
                        show: false,
                     },
                     itemStyle: {
                        normal: {
                           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                 offset: 0,
                                 color: solarTheme.gradientLeft,
                              },
                              {
                                 offset: 1,
                                 color: solarTheme.gradientRight,
                              },
                           ]),
                           shadowColor: solarTheme.shadowColor,
                           shadowBlur: 0,
                           shadowOffsetX: 0,
                           shadowOffsetY: 3,
                        },
                     },
                     hoverAnimation: false,
                  },
                  {
                     value: 100 - this.value,
                     name: ' ',
                     tooltip: {
                        show: false,
                     },
                     label: {
                        normal: {
                           position: 'inner',
                        },
                     },
                     itemStyle: {
                        normal: {
                           color: config.variables.layoutBg,
                        },
                     },
                  },
               ],
            },
            {
               name: ' ',
               clockWise: true,
               hoverAnimation: false,
               type: 'pie',
               center: ['45%', '50%'],
               radius: solarTheme.radius,
               data: [
                  {
                     value: this.value,
                     name: ' ',
                     label: {
                        normal: {
                           position: 'inner',
                           show: false,
                        },
                     },
                     tooltip: {
                        show: false,
                     },
                     itemStyle: {
                        normal: {
                           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              {
                                 offset: 0,
                                 color: solarTheme.gradientLeft,
                              },
                              {
                                 offset: 1,
                                 color: solarTheme.gradientRight,
                              },
                           ]),
                           shadowColor: solarTheme.shadowColor,
                           shadowBlur: 7,
                        },
                     },
                     hoverAnimation: false,
                  },
                  {
                     value: 100,
                     name: ' ',
                     tooltip: {
                        show: false,
                     },
                     label: {
                        normal: {
                           position: 'inner',
                        },
                     },
                     itemStyle: {
                        normal: {
                           color: 'none',
                        },
                     },
                  },
               ],
            },
         ],
      });
   };

   constructor(private theme: NbThemeService) {
   }

   ngAfterViewInit() {
      this.themeSubscription = this.theme.getJsTheme().pipe(delay(10)).subscribe(config => {
         this.config = config;
         this.setOption(config);
      });
   }

   ngOnDestroy() {
      this.themeSubscription.unsubscribe();
   }
}
