import {
    Component, OnInit, Input, Inject
} from '@angular/core';
import '../../../style/app.css';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/platform-browser';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { DataSource } from '../question-models/interfaces/data-source';
import { FormErrorsService } from '../services';
@Component({
    selector: 'form-renderer',
    templateUrl: 'form-renderer.component.html',
    styles: [DEFAULT_STYLES]
})
export class FormRendererComponent implements OnInit {

    @Input() node: NodeBase;
    @Input() parentGroup: AfeFormGroup;
    showTime: boolean;
    showWeeks: boolean;
    activeTab: number;
    dataSource: DataSource;

    constructor(private validationFactory: ValidationFactory,
        private dataSources: DataSources, private formErrorsService: FormErrorsService,
        @Inject(DOCUMENT) private document: Document) {
        this.activeTab = 0;
    }

    ngOnInit() {
        this.setUpRemoteSelect();
        if (this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe(
                error => {
                    this.scrollToControl(error);
                });
        }
    }

    setUpRemoteSelect() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'remote-select') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    }


    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }

    loadPreviousTab() {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    }

    isCurrentTabFirst() {
        return this.activeTab === 0;
    }

    isCurrentTabLast() {
        return this.activeTab === this.node.question['questions'].length - 1;
    }

    loadNextTab() {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    }
    tabSelected($event) {
        this.activeTab = $event.index;
    }
    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }

    errors() {
        return this.getErrors(this.node);
    }

    private getErrors(node: NodeBase) {
        let errors: any = node.control.errors;

        if (errors) {

            return this.validationFactory.errors(errors, node.question);
        }

        return [];
    }

    scrollToControl(error: string) {
        let tab: number = +error.split(',')[0];
        let elSelector = error.split(',')[1] + 'id';
        this.clickTab(tab);

        setTimeout(() => {
            let element: any = this.document.getElementById(elSelector);
            element.focus();
        }, 800);
    }
}
