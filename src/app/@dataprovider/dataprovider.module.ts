import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FusionTableService } from './fusion-table.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
  ],
  imports: [
      CommonModule,
      HttpModule
  ],
  providers: [
      FusionTableService
  ]
})
export class DataproviderModule {}
