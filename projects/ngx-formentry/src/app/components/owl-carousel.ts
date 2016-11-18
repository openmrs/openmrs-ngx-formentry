import { Component, Input, ElementRef, HostBinding } from '@angular/core';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
declare var $: any;
@Component({
    selector: 'owl-carousel',
    template: `
    	<ul class="nav nav-tabs">
    <ng-content></ng-content>
    	</ul>
    `
})
export class OwlCarouselComponent {
    @HostBinding('class') defaultClass = 'owl-carousel';
    @Input() options: Object;

    $owlElement: any;

    defaultOptions: any = {
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-chevron-left"></i>',
            '<i class="fa fa-chevron-right"></i>'
        ],
        dots: false,
        responsive: {
            0: { items: 2 },
            250: { items: 3 },
            400: { items: 4 },
            500: { items: 5 }
        }
    };

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        // use default - empty
        // for (var key in this.options) {
        //   this.defaultOptions[key] = this.options[key];
        // }
        this.$owlElement = $(this.el.nativeElement).owlCarousel(this.defaultOptions);
    }

    ngOnDestroy() {
        this.$owlElement.data('owlCarousel').destroy();
        this.$owlElement = null;
    }
}
