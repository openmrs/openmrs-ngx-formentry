import { Component, OnInit, Input } from '@angular/core';
import { NodeBase, GroupNode, LeafNode } from '../../form-entry/form-factory/form-node';
import { QuestionBase } from '../../form-entry/question-models/question-base';
import * as _ from 'lodash';
import { EncounterViewerService } from '../encounter-viewer.service';

@Component({
    selector: 'encounter-viewer',
    templateUrl: './encounter-viewer.component.html',
    styleUrls: ['./encounter-viewer.component.css']
})
export class EncounterViewerComponent implements OnInit {
    public rootNode: NodeBase;
    public enc;
    public _schema;
    @Input() public parentComponent: EncounterViewerComponent;

    @Input() set node(rootNode: NodeBase) {

        this.rootNode = rootNode;
    }

    @Input() public set schema(schema: any) {
        this._schema = schema;
    }

    @Input() public set encounter(enc: any) {
        this.enc = enc;
    }
     @Input() set form(form: any) {
         this.rootNode = form.rootNode;
         this._schema = form.schema;
         this.encService.traverse(this.rootNode, this._schema);
    }



    constructor(private encService: EncounterViewerService) {
    }

    public ngOnInit() {}

    public questionsAnswered(node: any) {
        const $answered = this.encService.questionsAnswered(node);
        return $answered;
    }

    public questionAnswered(node: NodeBase) {
        const answered = this.encService.hasAnswer(node);
        return answered;
    }

    public checkForColon(questionLabel: string) {
        if (questionLabel.indexOf(':') === -1) { return true; } else { return false; }
    }

    public isEncounterDetails(node: NodeBase) {
        if (node.question.label === 'Encounter Details'
         || node.question.label.indexOf('Encounter') > -1) {
            return true;
        } else {
            return false;
        }
    }
}
