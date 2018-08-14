/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from 'lodash';
export class HistoricalFieldHelperService {
    /**
     * @param {?} question
     * @param {?} valueProperty
     * @param {?} displayProperty
     * @return {?}
     */
    getDisplayTextFromOptions(question, valueProperty, displayProperty) {
        let /** @type {?} */ displayText = '';
        const /** @type {?} */ historicalValue = question.historicalDataValue;
        if (_.isArray(historicalValue.value)) {
            let /** @type {?} */ valueConverted = 0;
            _.each(historicalValue.value, (val) => {
                _.each(question.options, (option) => {
                    if (option[valueProperty] === val) {
                        if (valueConverted === 0) {
                            displayText = displayText + option[displayProperty];
                        }
                        else {
                            displayText = displayText + ', ' + option[displayProperty];
                        }
                        valueConverted++;
                    }
                });
            });
        }
        else {
            _.each(question.options, (option) => {
                if (option[valueProperty] === historicalValue.value) {
                    displayText = option[displayProperty];
                }
            });
        }
        return displayText;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1maWVsZC1oZWxwZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oaXN0b3JpY2FsLWZpZWxkLWhlbHBlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNOzs7Ozs7O0lBRUcseUJBQXlCLENBQUMsUUFBc0IsRUFBRyxhQUFxQixFQUFFLGVBQXVCO1FBRXRHLHFCQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsdUJBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMscUJBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBRWxDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxFQUFFLENBQUMsQ0FBQyxjQUFjLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekIsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQ3JEO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt5QkFDNUQ7d0JBQ0QsY0FBYyxFQUFFLENBQUM7cUJBQ2xCO2lCQUNGLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUVKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxXQUFXLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN2QzthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBRTs7Q0FJdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIHtcblxuICBwdWJsaWMgZ2V0RGlzcGxheVRleHRGcm9tT3B0aW9ucyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlICwgdmFsdWVQcm9wZXJ0eTogc3RyaW5nLCBkaXNwbGF5UHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBsZXQgZGlzcGxheVRleHQgPSAnJztcbiAgICBjb25zdCBoaXN0b3JpY2FsVmFsdWUgPSBxdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlO1xuICAgIGlmIChfLmlzQXJyYXkoaGlzdG9yaWNhbFZhbHVlLnZhbHVlKSkge1xuICAgICAgbGV0IHZhbHVlQ29udmVydGVkID0gMDtcbiAgICAgIF8uZWFjaChoaXN0b3JpY2FsVmFsdWUudmFsdWUsICh2YWwpID0+IHtcbiAgICAgICAgXy5lYWNoKHF1ZXN0aW9uLm9wdGlvbnMsIChvcHRpb24pID0+IHtcblxuICAgICAgICAgIGlmIChvcHRpb25bdmFsdWVQcm9wZXJ0eV0gPT09IHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlQ29udmVydGVkID09PSAwKSB7XG4gICAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gZGlzcGxheVRleHQgKyBvcHRpb25bZGlzcGxheVByb3BlcnR5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpc3BsYXlUZXh0ID0gZGlzcGxheVRleHQgKyAnLCAnICsgb3B0aW9uW2Rpc3BsYXlQcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlZCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBfLmVhY2gocXVlc3Rpb24ub3B0aW9ucywgKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uW3ZhbHVlUHJvcGVydHldID09PSBoaXN0b3JpY2FsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICBkaXNwbGF5VGV4dCA9IG9wdGlvbltkaXNwbGF5UHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3BsYXlUZXh0IDtcbiAgfVxuXG5cbn1cbiJdfQ==