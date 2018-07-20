import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SearchsRoutingModule, routedComponents } from './searchs-routing.module';
import { Ng2SmartTableModule } from '../../../../ng2-smart-table/src/ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';

@NgModule({
   imports: [
      ThemeModule,
      SearchsRoutingModule,
      Ng2SmartTableModule,
   ],
   declarations: [
      ...routedComponents,
   ],
   providers: [
      SmartTableService,
   ],
})
export class SearchsModule { }
