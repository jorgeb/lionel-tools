import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagerService } from './pager.service';
import { PagerComponent } from './pager.component';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
      PagerComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
      PagerComponent
  ],
  providers: [
      PagerService
  ]
})
export class PagerModule {}
