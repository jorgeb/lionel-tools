import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsComponent } from './ts.component';

console.log('`Detail` bundle loaded asynchronously');

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        TsComponent
    ],
    exports: [TsComponent],
    imports: [
        CommonModule    ],
})
export class TsModule {
}
