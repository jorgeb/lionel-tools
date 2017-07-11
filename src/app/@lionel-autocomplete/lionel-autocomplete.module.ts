import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LionelAutocompleteComponent } from './lionel-autocomplete.component';
import { LionelAutocompleteService } from './lionel-autocomplete.service';
@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        LionelAutocompleteComponent
    ],
    exports: [LionelAutocompleteComponent],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule
        ],
    providers: [
      LionelAutocompleteService
    ]
})
export class LionelAutocompleteModule {
}
