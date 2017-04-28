import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GapiModule } from '../@gapi';

import { Authorization } from './authorization.service';
@NgModule({
  declarations: [
    // Components / Directives/ Pipes
  ],
  imports: [
      CommonModule,
      GapiModule
  ],
  providers: [
      Authorization
  ]
})
export class AuthorizationModule {}
