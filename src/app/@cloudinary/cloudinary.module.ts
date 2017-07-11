import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryListViewerComponent } from './cloudinary-list-viewer.component';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
      CloudinaryListViewerComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      NgbModule
  ],
  exports: [
      CloudinaryListViewerComponent
  ],
  providers: [
      CloudinaryService
  ]
})
export class CloudinaryModule {}
