import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterViewerComponent } from './encounter-view/encounter-viewer.component';
import { EncounterContainerComponent } from './encounter-container/encounter-container.component';
import { EncounterViewerService } from './encounter-viewer.service';
import { EncounterPdfViewerService } from './encounter-pdf-viewer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlComponent } from './display-controls/question-control.component';
import { FilePreviewComponent } from './display-controls/file-preview.component';
import { RemoteAnswerComponent } from './display-controls/remote-answer.component';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared.module';
@NgModule({
    declarations: [
        EncounterViewerComponent,
        EncounterContainerComponent,
        QuestionControlComponent,
        FilePreviewComponent,
        RemoteAnswerComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        SharedModule
    ],
    providers: [
        EncounterViewerService,
        EncounterPdfViewerService
    ],
    exports: [
        EncounterContainerComponent,
        HttpModule
    ],
})
export class EncounterViewerModule {}
