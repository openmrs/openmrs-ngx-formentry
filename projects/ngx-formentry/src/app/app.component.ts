import { Component, style, state, animate, transition, trigger, AfterViewChecked, OnDestroy, ViewChild } from '@angular/core';
import { QuestionFactory } from './form-entry/factories/question.factory';
import { FormGroup } from '@angular/forms';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../style/app.scss';
const form = require('./adult');
declare let $: any;
@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
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
export class AppComponent implements AfterViewChecked, OnDestroy {
    data: any;
    schema: any;
    sections: {} = {};
    formGroup: FormGroup;
    activeTab;
    items1: Array<number> = [1, 2, 3, 4, 5];
    $owlElement: any;
    @ViewChild('slick') slick;

    constructor(private questionFactory: QuestionFactory) {
        // Do stuff
        console.log(form);
        this.schema = form;
        this.sections = this.createSections(form);
        this.activeTab = 0;
    }
    ngAfterViewChecked(): void {
        this.$owlElement = $(this.slick.nativeElement).not('.slick-initialized').slick({
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
        );
    }
    ngOnDestroy() {
        this.$owlElement.unslick();
        this.$owlElement = null;
    }
    createSections(formSchema) {
        let sections = {};
        for (let page of formSchema.pages) {
            for (let section of page.sections) {
                let sectionData = {};
                sectionData[section.id] = {
                    form: this.formGroup,
                    questions: this.questionFactory.getSchemaQuestions(section.questions)
                };
                Object.assign(sections, sectionData);
            }
        }
        return sections;
    }
    getSectionData(sectionId) {
        let data = {};
        data = this.sections[sectionId];
        return data;
    }


    clickTab(tabNumber) {
        this.activeTab = tabNumber;
        console.log(tabNumber);
    }
    optionsSearch(query: string): Promise<Array<any>> {
        var options = SearchExampleStandard.standardOptions.map((o: string) => ({ title: o }));
        //noinspection TypeScriptUnresolvedFunction
        return new Promise((resolve, reject) => {
            var results = options.filter((o: any) => {
                return o.title.slice(0, query.length).toLowerCase() == query.toLowerCase();
            });
            setTimeout(() => {
                resolve(results);
            }, 300);
        });
    }
    getRemote(query) {
        console.log('Called with', query)
        let promise = new Promise(function (resolve, reject) {
            resolve([{ name: "Example", key: "Example" }, { name: "Test", key: "Test" }, { name: "What", key: "Test" },
            { name: "No", key: "No" }, { name: "Benefit", key: "Benefit" }, { name: "Oranges", key: "Oranges" },
            { name: "Artemis", key: "Artemis" }, { name: "Another", key: "Another" }]);
        });
        return [{ name: "Example", key: "Example" }, { name: "Test", key: "Test" }, { name: "What", key: "Test" },
        { name: "No", key: "No" }, { name: "Benefit", key: "Benefit" }, { name: "Oranges", key: "Oranges" },
        { name: "Artemis", key: "Artemis" }, { name: "Another", key: "Another" }];
    }
}
export class SearchExampleStandard {
    public icon: boolean = true;
    public static standardOptions: Array<string> = ["Apple", "Bird", "Car", "Dog", "Elephant", "Finch", "Gate",
        "Horrify", "Indigo", "Jelly", "Keep", "Lemur", "Manifest", "None", "Orange", "Peel", "Quest",
        "Resist", "Suspend", "Terrify", "Underneath", "Violet", "Water", "Xylophone", "Yellow", "Zebra"];
    //noinspection JSMethodCanBeStatic
    public get options(): Array<string> {
        return SearchExampleStandard.standardOptions;
    }
    //noinspection JSMethodCanBeStatic
    public alertSelected(selectedItem: string): void {
        alert(`You chose '${selectedItem}'!`);
    }
}