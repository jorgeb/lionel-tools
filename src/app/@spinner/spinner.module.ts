import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
//import { ModuleWithProviders } from '@angular/core';
import { SpinnerDirective } from './spinner.directive';
import { SpinnerService } from './spinner.service';
import { SpinnerBackDropComponent } from './spinner-backdrop.component';
import { SpinnerConfig } from './spinner-config';


@NgModule({
  declarations: [
      // Components / Directives/ Pipes
      SpinnerDirective,
      SpinnerComponent,
      SpinnerBackDropComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
      SpinnerDirective
  ],
  providers: [
      SpinnerService
  ],
  entryComponents: [
      SpinnerComponent,
      SpinnerBackDropComponent
  ]
})
export class SpinnerModule {}

/*
export class BusyModule {
    static forRoot(config: BusyConfig): ModuleWithProviders {
        return {
            ngModule: BusyModule,
            providers: [
                { provide: BusyConfig, useValue: config }
            ]
        };
    }
}*/