import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GapiLoader } from './gapi.service';
@NgModule({
  declarations: [
    // Components / Directives/ Pipes
      
  ],
  imports: [
      CommonModule
  ],
  exports: [
      
  ],
  providers: [
      GapiLoader
  ]
})
export class GapiModule {}
