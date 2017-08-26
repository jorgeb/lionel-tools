import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LiveAuctionersService } from './liveauctioners.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
  ],
  imports: [
      CommonModule,
      HttpModule
  ],
  providers: [
    LiveAuctionersService
  ]
})
export class LiveAuctionersModule {}
