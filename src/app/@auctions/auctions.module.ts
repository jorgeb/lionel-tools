import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuctionsService } from './auctions.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
  ],
  imports: [
      CommonModule,
      HttpModule
  ],
  providers: [
      AuctionsService
  ]
})
export class AuctionsModule {}
