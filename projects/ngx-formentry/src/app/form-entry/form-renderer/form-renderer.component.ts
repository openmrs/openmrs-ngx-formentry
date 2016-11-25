import {
    Component, OnInit, Input, animate, transition, style, state,
    trigger, AfterViewChecked, OnDestroy, ViewChild
} from '@angular/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../style/app.scss';

import { NodeBase } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { ValidationFactory } from '../form-factory/validation.factory';
@Component({
    selector: 'form-renderer',
    templateUrl: 'form-renderer.component.html',
    styleUrls: ['form-renderer.component.scss'],
    animations: [
        trigger('flyIn', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(100%)' }),
                animate(250)
            ])
        ])
    ]
})
export class FormRendererComponent implements OnInit, AfterViewChecked, OnDestroy {

    @Input() node: NodeBase;
    @Input() parentGroup: AfeFormGroup;
    activeTab: number;
    $owlElement: any;
    @ViewChild('slick') slick;

    constructor(private validationFactory: ValidationFactory) {
        this.activeTab = 0;
    }

    ngOnInit() {
        console.log('Node', this.node);
    }

    ngAfterViewChecked(): void {
        this.$owlElement = this.slick && this.slick.nativeElement ? $(this.slick.nativeElement).not('.slick-initialized').slick({
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
        // console.log(tabNumber);
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

}
