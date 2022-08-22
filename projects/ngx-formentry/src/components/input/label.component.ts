/* tslint:disable:component-class-suffix  */
import {
    Component,
    Input,
    AfterViewInit,
    ElementRef,
    HostBinding,
    TemplateRef,
    ViewChild,
    ContentChild,
    AfterContentInit
} from "@angular/core";

import { TextArea } from "./text-area.directive";

/**
 * [See demo](../../?path=/story/input--label)
 *
 * ```html
 * <ibm-label labelState="success">
 *     <label label>Field with success</label>
 *     <input type="text" class="input-field">
 * </ibm-label>
 *
 * <ibm-label labelState="warning">
 *     <label label>Field with warning</label>
 *     <input type="text" class="input-field">
 * </ibm-label>
 *
 * <ibm-label labelState="error">
 *     <label label>Field with error</label>
 *     <input type="text" class="input-field">
 * </ibm-label>
 * ```
 *
 * <example-url>../../iframe.html?id=input--label</example-url>
 */
@Component({
    selector: "ibm-label",
    template: `
        <label
            [for]="labelInputID"
            [attr.aria-label]="ariaLabel"
            class="cds--label"
            [ngClass]="{
                'cds--skeleton': skeleton
            }">
            <ng-content></ng-content>
        </label>
        <div
            [class]="wrapperClass"
            [ngClass]="{
                'cds--text-input__field-wrapper--warning': warn
            }"
            [attr.data-invalid]="(invalid ? true : null)"
            #wrapper>
            <svg *ngIf="invalid"focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="cds--text-input__invalid-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2    c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path><path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8    c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path></svg>
            <ng-content select="input,textarea,div"></ng-content>
        </div>
        <div *ngIf="!skeleton && helperText && !invalid && !warn" class="cds--form__helper-text">
            <ng-container *ngIf="!isTemplate(helperText)">{{helperText}}</ng-container>
            <ng-template *ngIf="isTemplate(helperText)" [ngTemplateOutlet]="helperText"></ng-template>
        </div>
        <div *ngIf="!warn && invalid" class="cds--form-requirement">
            <ng-container *ngIf="!isTemplate(invalidText)">{{invalidText}}</ng-container>
            <ng-template *ngIf="isTemplate(invalidText)" [ngTemplateOutlet]="invalidText"></ng-template>
        </div>
        <div *ngIf="!invalid && warn" class="cds--form-requirement">
            <ng-container *ngIf="!isTemplate(warnText)">{{warnText}}</ng-container>
            <ng-template *ngIf="isTemplate(warnText)" [ngTemplateOutlet]="warnText"></ng-template>
        </div>
    `
})
export class Label implements AfterContentInit, AfterViewInit {
    /**
     * Used to build the id of the input item associated with the `Label`.
     */
    static labelCounter = 0;
    /**
     * The class of the wrapper
     */
    wrapperClass = "cds--text-input__field-wrapper";
    /**
     * The id of the input item associated with the `Label`. This value is also used to associate the `Label` with
     * its input counterpart through the 'for' attribute.
    */
    @Input() labelInputID = "ibm-label-" + Label.labelCounter;

    /**
     * State of the `Label` will determine the styles applied.
     */
    @Input() labelState: "success" | "warning" | "error" | "" = "";
    /**
     * Set to `true` for a loading label.
     */
    @Input() skeleton = false;
    /**
     * Optional helper text that appears under the label.
     */
    @Input() helperText: string | TemplateRef<any>;
    /**
     * Sets the invalid text.
     */
    @Input() invalidText: string | TemplateRef<any>;
    /**
     * Set to `true` for an invalid label component.
     */
    @Input() invalid = false;
    /**
      * Set to `true` to show a warning (contents set by warningText)
      */
    @Input() warn = false;
    /**
     * Sets the warning text
     */
    @Input() warnText: string | TemplateRef<any>;
    /**
     * Set the arialabel for label
     */
    @Input() ariaLabel: string;

    // @ts-ignore
    @ViewChild("wrapper", { static: false }) wrapper: ElementRef<HTMLDivElement>;

    // @ts-ignore
    @ContentChild(TextArea, { static: false }) textArea: TextArea;

    @HostBinding("class.cds--form-item") labelClass = true;

    /**
     * Creates an instance of Label.
     */
    constructor() {
        Label.labelCounter++;
    }

    /**
     * Update wrapper class if a textarea is hosted.
     */
    ngAfterContentInit() {
        if (this.textArea) {
            this.wrapperClass = "cds--text-area__wrapper";
        }
    }

    /**
     * Sets the id on the input item associated with the `Label`.
     */
    ngAfterViewInit() {
        if (this.wrapper) {
            const inputElement = this.wrapper.nativeElement.querySelector("input,textarea,div");
            if (inputElement) {
                inputElement.setAttribute("id", this.labelInputID);
            }
        }
    }

    public isTemplate(value) {
        return value instanceof TemplateRef;
    }
}
