/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { NestedQuestion } from './interfaces/nested-questions';
export class QuestionGroup extends NestedQuestion {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.isExpanded = true;
        this.renderingType = 'group';
        this.questions = options.questions || [];
        this.controlType = AfeControlType.AfeFormGroup;
    }
}
function QuestionGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    QuestionGroup.prototype.questions;
    /** @type {?} */
    QuestionGroup.prototype.isExpanded;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUvRCxNQUFNLG9CQUFxQixTQUFRLGNBQWM7Ozs7SUFJN0MsWUFBWSxPQUE2QjtRQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7MEJBSE4sSUFBSTtRQUliLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO0tBQ2xEO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgR3JvdXBRdWVzdGlvbk9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvZ3JvdXAtcXVlc3Rpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvbmVzdGVkLXF1ZXN0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkdyb3VwIGV4dGVuZHMgTmVzdGVkUXVlc3Rpb24ge1xuICAgIHF1ZXN0aW9uczogUXVlc3Rpb25CYXNlW107XG4gICAgaXNFeHBhbmRlZCA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBHcm91cFF1ZXN0aW9uT3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ2dyb3VwJztcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSBvcHRpb25zLnF1ZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Hcm91cDtcbiAgICB9XG59XG4iXX0=