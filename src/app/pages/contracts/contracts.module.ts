import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from '../../../../ng2-smart-table/src/ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ContractsRoutingModule, routedComponents } from './contracts-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';

@NgModule({
  imports: [
    ThemeModule,
    ContractsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
  ],
})
export class ContractsModule { }
