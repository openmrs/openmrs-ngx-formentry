import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';
import { SelectDropdownComponent } from './select-dropdown.component';

import { DiacriticsService } from './diacritics.service';

@NgModule({
    declarations: [
        SelectComponent,
        SelectDropdownComponent
    ],
    exports: [
        SelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        DiacriticsService
    ]
})
export class SelectModule { }
