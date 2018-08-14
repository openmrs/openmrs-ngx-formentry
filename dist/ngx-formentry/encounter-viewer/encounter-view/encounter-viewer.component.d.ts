import { OnInit } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterViewerService } from '../encounter-viewer.service';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';
export declare class EncounterViewerComponent implements OnInit {
    private encounterViewerService;
    private dataSources;
    rootNode: NodeBase;
    enc: any;
    fileDataSource: DataSource;
    remoteDataSource: DataSource;
    customDataSource: DataSource;
    _schema: any;
    parentGroup: AfeFormGroup;
    parentComponent: EncounterViewerComponent;
    node: NodeBase;
    schema: any;
    encounter: any;
    form: any;
    constructor(encounterViewerService: EncounterViewerService, dataSources: DataSources);
    ngOnInit(): void;
    questionsAnswered(node: any): boolean;
    questionAnswered(node: NodeBase): boolean;
    checkForColon(questionLabel: string): boolean;
}
