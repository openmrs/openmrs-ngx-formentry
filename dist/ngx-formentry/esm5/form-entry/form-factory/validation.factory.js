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
var ValidationFactory = /** @class */ (function () {
    function ValidationFactory() {
    }
    /**
     * @param {?} question
     * @param {?=} form
     * @return {?}
     */
    ValidationFactory.prototype.getValidators = /**
     * @param {?} question
     * @param {?=} form
     * @return {?}
     */
    function (question, form) {
        var _this = this;
        var /** @type {?} */ list = [];
        if (question.validators) {
            _.forEach(question.validators, function (validator) {
                switch (validator.type) {
                    case 'date':
                        list.push(_this.dateValidator);
                        var /** @type {?} */ allowFutureDates = (/** @type {?} */ (validator)).allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(_this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(_this.jsExpressionValidator.validate(/** @type {?} */ (validator), form));
                        break;
                    case 'max':
                        list.push(_this.getMaxValueValidator((/** @type {?} */ (validator)).max));
                        break;
                    case 'min':
                        list.push(_this.getMinValueValidator((/** @type {?} */ (validator)).min));
                        break;
                    case 'conditionalRequired':
                        list.push(_this.conditionalRequiredValidator.validate(/** @type {?} */ (validator)));
                        break;
                    case 'conditionalAnswered':
                        list.push(_this.conditionalAnsweredValidator.validate(/** @type {?} */ (validator)));
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
    };
    Object.defineProperty(ValidationFactory.prototype, "conditionalRequiredValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new ConditionalRequiredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "conditionalAnsweredValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new ConditionalAnsweredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "requiredValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new RequiredValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "dateValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new DateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "futureDateRestrictionValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new FutureDateRestrictionValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxDateValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new MaxDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minDateValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new MinDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minLengthValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.minLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxLengthValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.maxLength;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} min
     * @return {?}
     */
    ValidationFactory.prototype.getMinValueValidator = /**
     * @param {?} min
     * @return {?}
     */
    function (min) {
        return new MinValidator().validate(min);
    };
    /**
     * @param {?} max
     * @return {?}
     */
    ValidationFactory.prototype.getMaxValueValidator = /**
     * @param {?} max
     * @return {?}
     */
    function (max) {
        return new MaxValidator().validate(max);
    };
    Object.defineProperty(ValidationFactory.prototype, "jsExpressionValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new JsExpressionValidator();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} errors
     * @param {?} question
     * @return {?}
     */
    ValidationFactory.prototype.errors = /**
     * @param {?} errors
     * @param {?} question
     * @return {?}
     */
    function (errors, question) {
        var /** @type {?} */ messages = [];
        for (var /** @type {?} */ property in errors) {
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
    };
    ValidationFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ValidationFactory.ctorParameters = function () { return []; };
    return ValidationFactory;
}());
export { ValidationFactory };
function ValidationFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ValidationFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ValidationFactory.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBVzNDO0tBQWdCOzs7Ozs7SUFFaEIseUNBQWE7Ozs7O0lBQWIsVUFBYyxRQUFzQixFQUFFLElBQVU7UUFBaEQsaUJBNENDO1FBMUNDLHFCQUFNLElBQUksR0FBZSxFQUFFLENBQUM7UUFFNUIsRUFBRSxDQUFD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QUNSLEtBQUssZUFBZTt3QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO29CQUNSLEtBQUssc0JBQXNCO3dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxLQUFLLENBQUM7aUJBQ1Q7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2dCQXJKbkIsVUFBVTs7Ozs0QkF2Qlg7O1NBd0JhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9jb25kaXRpb25hbC1yZXF1aXJlZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yJztcbmltcG9ydCB7IFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9yZXF1aXJlZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvZGF0ZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWluVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9taW4udmFsaWRhdG9yJztcbmltcG9ydCB7IE1heFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWF4LnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNaW5EYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9taW4tZGF0ZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWF4RGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWF4LWRhdGUudmFsaWRhdG9yJztcbmltcG9ydCB7IEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvanMtZXhwcmVzc2lvbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgTWVzc2FnZXMgfSBmcm9tICcuLi91dGlscy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2RhdGUtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBNYXhWYWxpZGF0aW9uTW9kZWx9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tYXgtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBNaW5WYWxpZGF0aW9uTW9kZWx9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9taW4tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkZhY3Rvcnkge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRWYWxpZGF0b3JzKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGZvcm0/OiBhbnkpIHtcblxuICAgIGNvbnN0IGxpc3Q6IEFycmF5PGFueT4gPSBbXTtcblxuICAgIGlmIChxdWVzdGlvbi52YWxpZGF0b3JzKSB7XG5cbiAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi52YWxpZGF0b3JzLCAodmFsaWRhdG9yOiBWYWxpZGF0aW9uTW9kZWwpID0+IHtcblxuICAgICAgICBzd2l0Y2ggKHZhbGlkYXRvci50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5kYXRlVmFsaWRhdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFsbG93RnV0dXJlRGF0ZXM6IGJvb2xlYW4gPSAoIDxEYXRlVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvciApLmFsbG93RnV0dXJlRGF0ZXM7XG5cbiAgICAgICAgICAgIGlmICghYWxsb3dGdXR1cmVEYXRlcykge1xuICAgICAgICAgICAgICBsaXN0LnB1c2godGhpcy5mdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnanNfZXhwcmVzc2lvbic6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5qc0V4cHJlc3Npb25WYWxpZGF0b3IudmFsaWRhdGUoPEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IsIGZvcm0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5nZXRNYXhWYWx1ZVZhbGlkYXRvcigoPE1heFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpLm1heCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWluJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmdldE1pblZhbHVlVmFsaWRhdG9yKCg8TWluVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikubWluKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbFJlcXVpcmVkJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmNvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IudmFsaWRhdGUoPENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxBbnN3ZXJlZCc6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5jb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yLnZhbGlkYXRlKDxDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocXVlc3Rpb24ucmVxdWlyZWQgJiYgdHlwZW9mKHF1ZXN0aW9uLnJlcXVpcmVkKSA9PT0gJ3N0cmluZycgJiYgcXVlc3Rpb24ucmVxdWlyZWQgPT09ICd0cnVlJykge1xuICAgICAgbGlzdC5wdXNoKHRoaXMucmVxdWlyZWRWYWxpZGF0b3IpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIFRPRE8gLSBoYW5kbGUgY3VzdG9tIHJlcXVpcmVkIHZhbGlkYXRvclxuICAgIH1cblxuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IoKTogQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yKCk7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvcigpOiBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IoKTtcbiAgfVxuXG4gIGdldCByZXF1aXJlZFZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBkYXRlVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgZnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBGdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBtYXhEYXRlVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNYXhEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgbWluRGF0ZVZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgTWluRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IG1pbkxlbmd0aFZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLm1pbkxlbmd0aDtcbiAgfVxuXG4gIGdldCBtYXhMZW5ndGhWYWxpZGF0b3IoKSB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMubWF4TGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIGdldE1pblZhbHVlVmFsaWRhdG9yKG1pbjogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1pblZhbGlkYXRvcigpLnZhbGlkYXRlKG1pbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF4VmFsdWVWYWxpZGF0b3IobWF4OiBudW1iZXIpOiBhbnkge1xuXG4gICAgcmV0dXJuIG5ldyBNYXhWYWxpZGF0b3IoKS52YWxpZGF0ZShtYXgpO1xuICB9XG5cbiAgZ2V0IGpzRXhwcmVzc2lvblZhbGlkYXRvcigpIHtcblxuICAgIHJldHVybiBuZXcgSnNFeHByZXNzaW9uVmFsaWRhdG9yKCk7XG4gIH1cblxuICBwdWJsaWMgZXJyb3JzKGVycm9yczogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogQXJyYXk8c3RyaW5nPiB7XG5cbiAgICBjb25zdCBtZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBlcnJvcnMpIHtcbiAgICAgICAgaWYgKGVycm9ycy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcblxuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICBjYXNlICdyZXF1aXJlZCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5SRVFVSVJFRF9GSUVMRF9NU0cpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLklOVkFMSURfREFURV9NU0cpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdmdXR1cmVEYXRlUmVzdHJpY3Rpb24nOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuRlVUVVJFX0RBVEVfUkVTVFJJQ1RJT05fTVNHKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWlubGVuZ3RoJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9MRU5HVEhfTVNHLnJlcGxhY2UoJ3ttaW5MZW5ndGh9JywgZXJyb3JzLm1pbmxlbmd0aC5yZXF1aXJlZExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtYXhsZW5ndGgnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0xFTkdUSF9NU0cucmVwbGFjZSgne21heExlbmd0aH0nLCBlcnJvcnMubWF4bGVuZ3RoLnJlcXVpcmVkTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21heGRhdGUnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUFYX0RBVEVfTVNHLnJlcGxhY2UoJ3ttYXhEYXRlfScsIGVycm9ycy5tYXhkYXRlLnJlcXVpcmVkRGF0ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtaW5kYXRlJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9EQVRFX01TRy5yZXBsYWNlKCd7bWluRGF0ZX0nLCBlcnJvcnMubWluZGF0ZS5yZXF1aXJlZERhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1BWF9NU0cucmVwbGFjZSgne21heH0nLCBlcnJvcnMubWF4LnJlcXVpcmVkVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWluJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9NU0cucmVwbGFjZSgne21pbn0nLCBlcnJvcnMubWluLnJlcXVpcmVkVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnanNfZXhwcmVzc2lvbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2pzX2V4cHJlc3Npb24nXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxfcmVxdWlyZWQnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydjb25kaXRpb25hbF9yZXF1aXJlZCddLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjb25kaXRpb25hbF9hbnN3ZXJlZCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJ10ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH1cbn1cbiJdfQ==