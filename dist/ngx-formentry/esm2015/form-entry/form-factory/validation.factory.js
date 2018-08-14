/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ConditionalRequiredValidator } from '../validators/conditional-required.validator';
import { ConditionalAnsweredValidator } from '../validators/conditional-answered.validator';
import { RequiredValidator } from '../validators/required.validator';
import { DateValidator } from '../validators/date.validator';
import { MinValidator } from '../validators/min.validator';
import { MaxValidator } from '../validators/max.validator';
import { MinDateValidator } from '../validators/min-date.validator';
import { MaxDateValidator } from '../validators/max-date.validator';
import { FutureDateRestrictionValidator } from '../validators/future-date-restriction.validator';
import { JsExpressionValidator } from '../validators/js-expression.validator';
import { Messages } from '../utils/messages';
export class ValidationFactory {
    constructor() { }
    /**
     * @param {?} question
     * @param {?=} form
     * @return {?}
     */
    getValidators(question, form) {
        const /** @type {?} */ list = [];
        if (question.validators) {
            _.forEach(question.validators, (validator) => {
                switch (validator.type) {
                    case 'date':
                        list.push(this.dateValidator);
                        const /** @type {?} */ allowFutureDates = (/** @type {?} */ (validator)).allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(this.jsExpressionValidator.validate(/** @type {?} */ (validator), form));
                        break;
                    case 'max':
                        list.push(this.getMaxValueValidator((/** @type {?} */ (validator)).max));
                        break;
                    case 'min':
                        list.push(this.getMinValueValidator((/** @type {?} */ (validator)).min));
                        break;
                    case 'conditionalRequired':
                        list.push(this.conditionalRequiredValidator.validate(/** @type {?} */ (validator)));
                        break;
                    case 'conditionalAnswered':
                        list.push(this.conditionalAnsweredValidator.validate(/** @type {?} */ (validator)));
                        break;
                }
            });
        }
        if (question.required && typeof (question.required) === 'string' && question.required === 'true') {
            list.push(this.requiredValidator);
        }
        else {
            // TODO - handle custom required validator
        }
        return list;
    }
    /**
     * @return {?}
     */
    get conditionalRequiredValidator() {
        return new ConditionalRequiredValidator();
    }
    /**
     * @return {?}
     */
    get conditionalAnsweredValidator() {
        return new ConditionalAnsweredValidator();
    }
    /**
     * @return {?}
     */
    get requiredValidator() {
        return new RequiredValidator().validate;
    }
    /**
     * @return {?}
     */
    get dateValidator() {
        return new DateValidator().validate;
    }
    /**
     * @return {?}
     */
    get futureDateRestrictionValidator() {
        return new FutureDateRestrictionValidator().validate;
    }
    /**
     * @return {?}
     */
    get maxDateValidator() {
        return new MaxDateValidator().validate;
    }
    /**
     * @return {?}
     */
    get minDateValidator() {
        return new MinDateValidator().validate;
    }
    /**
     * @return {?}
     */
    get minLengthValidator() {
        return Validators.minLength;
    }
    /**
     * @return {?}
     */
    get maxLengthValidator() {
        return Validators.maxLength;
    }
    /**
     * @param {?} min
     * @return {?}
     */
    getMinValueValidator(min) {
        return new MinValidator().validate(min);
    }
    /**
     * @param {?} max
     * @return {?}
     */
    getMaxValueValidator(max) {
        return new MaxValidator().validate(max);
    }
    /**
     * @return {?}
     */
    get jsExpressionValidator() {
        return new JsExpressionValidator();
    }
    /**
     * @param {?} errors
     * @param {?} question
     * @return {?}
     */
    errors(errors, question) {
        const /** @type {?} */ messages = [];
        for (const /** @type {?} */ property in errors) {
            if (errors.hasOwnProperty(property)) {
                switch (property) {
                    case 'required':
                        messages.push(Messages.REQUIRED_FIELD_MSG);
                        break;
                    case 'date':
                        messages.push(Messages.INVALID_DATE_MSG);
                        break;
                    case 'futureDateRestriction':
                        messages.push(Messages.FUTURE_DATE_RESTRICTION_MSG);
                        break;
                    case 'minlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{minLength}', errors.minlength.requiredLength));
                        break;
                    case 'maxlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{maxLength}', errors.maxlength.requiredLength));
                        break;
                    case 'maxdate':
                        messages.push(Messages.MAX_DATE_MSG.replace('{maxDate}', errors.maxdate.requiredDate));
                        break;
                    case 'mindate':
                        messages.push(Messages.MIN_DATE_MSG.replace('{minDate}', errors.mindate.requiredDate));
                        break;
                    case 'max':
                        messages.push(Messages.MAX_MSG.replace('{max}', errors.max.requiredValue));
                        break;
                    case 'min':
                        messages.push(Messages.MIN_MSG.replace('{min}', errors.min.requiredValue));
                        break;
                    case 'js_expression':
                        messages.push(errors['js_expression'].message);
                        break;
                    case 'conditional_required':
                        messages.push(errors['conditional_required'].message);
                        break;
                    case 'conditional_answered':
                        messages.push(errors['conditional_answered'].message);
                        break;
                }
            }
        }
        return messages;
    }
}
ValidationFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ValidationFactory.ctorParameters = () => [];
function ValidationFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ValidationFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ValidationFactory.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTN0MsTUFBTTtJQUVKLGlCQUFnQjs7Ozs7O0lBRWhCLGFBQWEsQ0FBQyxRQUFzQixFQUFFLElBQVU7UUFFOUMsdUJBQU0sSUFBSSxHQUFlLEVBQUUsQ0FBQztRQUU1QixFQUFFLENBQUMsQ0FBQyxRQUFRLENB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TSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RELEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO2lCQUNUO2FBQ0o7U0FDSjtRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7Ozs7WUFySm5CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yJztcbmltcG9ydCB7IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvcmVxdWlyZWQudmFsaWRhdG9yJztcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2RhdGUudmFsaWRhdG9yJztcbmltcG9ydCB7IE1pblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNYXhWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21heC52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWluRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLWRhdGUudmFsaWRhdG9yJztcbmltcG9ydCB7IE1heERhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21heC1kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBGdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2pzLWV4cHJlc3Npb24udmFsaWRhdG9yJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IE1lc3NhZ2VzIH0gZnJvbSAnLi4vdXRpbHMvbWVzc2FnZXMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3ZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWF4VmFsaWRhdGlvbk1vZGVsfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWF4LXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWluVmFsaWRhdGlvbk1vZGVsfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWluLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25GYWN0b3J5IHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0VmFsaWRhdG9ycyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBmb3JtPzogYW55KSB7XG5cbiAgICBjb25zdCBsaXN0OiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBpZiAocXVlc3Rpb24udmFsaWRhdG9ycykge1xuXG4gICAgICBfLmZvckVhY2gocXVlc3Rpb24udmFsaWRhdG9ycywgKHZhbGlkYXRvcjogVmFsaWRhdGlvbk1vZGVsKSA9PiB7XG5cbiAgICAgICAgc3dpdGNoICh2YWxpZGF0b3IudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZGF0ZVZhbGlkYXRvcik7XG4gICAgICAgICAgICBjb25zdCBhbGxvd0Z1dHVyZURhdGVzOiBib29sZWFuID0gKCA8RGF0ZVZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IgKS5hbGxvd0Z1dHVyZURhdGVzO1xuXG4gICAgICAgICAgICBpZiAoIWFsbG93RnV0dXJlRGF0ZXMpIHtcbiAgICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuanNFeHByZXNzaW9uVmFsaWRhdG9yLnZhbGlkYXRlKDxKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yLCBmb3JtKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZ2V0TWF4VmFsdWVWYWxpZGF0b3IoKDxNYXhWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKS5tYXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5nZXRNaW5WYWx1ZVZhbGlkYXRvcigoPE1pblZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpLm1pbikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxSZXF1aXJlZCc6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5jb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yLnZhbGlkYXRlKDxDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsQW5zd2VyZWQnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuY29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvci52YWxpZGF0ZSg8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXN0aW9uLnJlcXVpcmVkICYmIHR5cGVvZihxdWVzdGlvbi5yZXF1aXJlZCkgPT09ICdzdHJpbmcnICYmIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAndHJ1ZScpIHtcbiAgICAgIGxpc3QucHVzaCh0aGlzLnJlcXVpcmVkVmFsaWRhdG9yKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBUT0RPIC0gaGFuZGxlIGN1c3RvbSByZXF1aXJlZCB2YWxpZGF0b3JcbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGdldCBjb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3Ige1xuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IoKTogQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgZGF0ZVZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IGZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgbWF4RGF0ZVZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgTWF4RGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IG1pbkRhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1pbkRhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBtaW5MZW5ndGhWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5taW5MZW5ndGg7XG4gIH1cblxuICBnZXQgbWF4TGVuZ3RoVmFsaWRhdG9yKCkge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLm1heExlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNaW5WYWx1ZVZhbGlkYXRvcihtaW46IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNaW5WYWxpZGF0b3IoKS52YWxpZGF0ZShtaW4pO1xuICB9XG5cbiAgcHVibGljIGdldE1heFZhbHVlVmFsaWRhdG9yKG1heDogbnVtYmVyKTogYW55IHtcblxuICAgIHJldHVybiBuZXcgTWF4VmFsaWRhdG9yKCkudmFsaWRhdGUobWF4KTtcbiAgfVxuXG4gIGdldCBqc0V4cHJlc3Npb25WYWxpZGF0b3IoKSB7XG5cbiAgICByZXR1cm4gbmV3IEpzRXhwcmVzc2lvblZhbGlkYXRvcigpO1xuICB9XG5cbiAgcHVibGljIGVycm9ycyhlcnJvcnM6IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IEFycmF5PHN0cmluZz4ge1xuXG4gICAgY29uc3QgbWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZXJyb3JzKSB7XG4gICAgICAgIGlmIChlcnJvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuUkVRVUlSRURfRklFTERfTVNHKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5JTlZBTElEX0RBVEVfTVNHKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZnV0dXJlRGF0ZVJlc3RyaWN0aW9uJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLkZVVFVSRV9EQVRFX1JFU1RSSUNUSU9OX01TRyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21pbmxlbmd0aCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKCd7bWluTGVuZ3RofScsIGVycm9ycy5taW5sZW5ndGgucmVxdWlyZWRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWF4bGVuZ3RoJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9MRU5HVEhfTVNHLnJlcGxhY2UoJ3ttYXhMZW5ndGh9JywgZXJyb3JzLm1heGxlbmd0aC5yZXF1aXJlZExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtYXhkYXRlJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1BWF9EQVRFX01TRy5yZXBsYWNlKCd7bWF4RGF0ZX0nLCBlcnJvcnMubWF4ZGF0ZS5yZXF1aXJlZERhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWluZGF0ZSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fREFURV9NU0cucmVwbGFjZSgne21pbkRhdGV9JywgZXJyb3JzLm1pbmRhdGUucmVxdWlyZWREYXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NQVhfTVNHLnJlcGxhY2UoJ3ttYXh9JywgZXJyb3JzLm1heC5yZXF1aXJlZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTVNHLnJlcGxhY2UoJ3ttaW59JywgZXJyb3JzLm1pbi5yZXF1aXJlZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydqc19leHByZXNzaW9uJ10ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snY29uZGl0aW9uYWxfcmVxdWlyZWQnXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxfYW5zd2VyZWQnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydjb25kaXRpb25hbF9hbnN3ZXJlZCddLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9XG59XG4iXX0=