import {
    Component, OnInit, Input, // animate, transition, style, state, trigger,
    AfterViewChecked, OnDestroy, ViewChild, Inject
} from '@angular/core';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../style/app.css';

import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/platform-browser';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { DataSource } from '../question-models/interfaces/data-source';
import { FormErrorsService } from '../services';
declare var $: any;
@Component({
    selector: 'form-renderer',
    templateUrl: 'form-renderer.component.html',
    styles: [DEFAULT_STYLES]
})
export class FormRendererComponent implements OnInit, AfterViewChecked, OnDestroy {

    @Input() node: NodeBase;
    @Input() parentGroup: AfeFormGroup;
    showTime: boolean;
    showWeeks: boolean;
    activeTab: number;
    $owlElement: any;
    dataSource: DataSource;
    @ViewChild('slick') slick;

    constructor(private validationFactory: ValidationFactory,
        private dataSources: DataSources, private formErrorsService: FormErrorsService,
        @Inject(DOCUMENT) private document: Document) {
        this.activeTab = 0;
        formErrorsService.announceErrorField$.subscribe(
            error => {
                this.scrollToControl(error);
            });
    }

    ngOnInit() {
        this.setUpRemoteSelect();
    }

    setUpRemoteSelect() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'remote-select') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    }

    ngAfterViewChecked(): void {
        this.$owlElement = this.slick && this.slick.nativeElement ?
            (<any>$(this.slick.nativeElement)).not('.slick-initialized').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 1,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            }
            ) : null;

    }
    ngOnDestroy() {
        if (this.$owlElement && this.$owlElement.unslick) { this.$owlElement.unslick(); }
        this.$owlElement = null;
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
        }, 300);
    }
}
