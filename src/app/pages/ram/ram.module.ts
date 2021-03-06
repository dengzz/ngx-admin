import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from '../../../../ng2-smart-table/src/ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { RamRoutingModule, routedComponents } from './ram-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';

@NgModule({
  imports: [
    ThemeModule,
    RamRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
  ],
})
export class RamModule { }
