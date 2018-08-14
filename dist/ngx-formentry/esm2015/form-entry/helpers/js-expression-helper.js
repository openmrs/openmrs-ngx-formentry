/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class JsExpressionHelper {
    /**
     * @param {?} height
     * @param {?} weight
     * @return {?}
     */
    calcBMI(height, weight) {
        let /** @type {?} */ r;
        if (height && weight) {
            r = (weight / (height / 100 * height / 100)).toFixed(1);
        }
        return height && weight ? parseFloat(r) : null;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isEmpty(val) {
        if (val === undefined || val === null || val === '' || val === 'null' || val === 'undefined') {
            return true;
        }
        if (Array.isArray(val) && val.length === 0) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    arrayContains(array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            let /** @type {?} */ contains = true;
            for (let /** @type {?} */ i = 0; i < members.length; i++) {
                const /** @type {?} */ val = members[i];
                if (array.indexOf(val) === -1) {
                    contains = false;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    }
    /**
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    extractRepeatingGroupValues(key, array) {
        const /** @type {?} */ values = array.map(function (item) {
            return item[key];
        });
        return values;
    }
    /**
     * @param {?} value
     * @param {?} format
     * @param {?} offset
     * @return {?}
     */
    formatDate(value, format, offset) {
        format = format || 'yyyy-MM-dd';
        offset = offset || '+0300';
        if (!(value instanceof Date)) {
            value = new Date(value);
            if (value === null || value === undefined) {
                throw new Error('DateFormatException: value passed ' +
                    'is not a valid date');
            }
        }
        return value; // TODO implement this
        // return $filter('date')(value, format, offset);
    }
    /**
     * @param {?} array
     * @param {?} members
     * @return {?}
     */
    arrayContainsAny(array, members) {
        if (Array.isArray(members)) {
            if (members.length === 0) {
                return true;
            }
            let /** @type {?} */ contains = false;
            for (let /** @type {?} */ i = 0; i < members.length; i++) {
                const /** @type {?} */ val = members[i];
                if (array.indexOf(val) !== -1) {
                    contains = true;
                }
            }
            return contains;
        }
        else {
            return array.indexOf(members) !== -1;
        }
    }
    /**
     * @return {?}
     */
    get helperFunctions() {
        const /** @type {?} */ helper = this;
        return {
            arrayContainsAny: helper.arrayContainsAny,
            calcBMI: helper.calcBMI,
            isEmpty: helper.isEmpty,
            arrayContains: helper.arrayContains,
            extractRepeatingGroupValues: helper.extractRepeatingGroupValues,
        };
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtZXhwcmVzc2lvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE1BQU07Ozs7OztJQUVKLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTTtRQUVwQixxQkFBSSxDQUFDLENBQUM7UUFDTixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RDtRQUNELE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNoRDs7Ozs7SUFFRCxPQUFPLENBQUMsR0FBRztRQUVULEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDN0YsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNkOzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU87UUFFMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7WUFFRCxxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXBCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsdUJBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLFFBQVEsR0FBRyxLQUFLLENBQUM7aUJBQ2xCO2FBQ0Y7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ2pCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0QztLQUNGOzs7Ozs7SUFDRCwyQkFBMkIsQ0FBQyxHQUFHLEVBQUUsS0FBSztRQUNwQyx1QkFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFTLElBQUk7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQixDQUFDLENBQUM7UUFDTCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2I7Ozs7Ozs7SUFDRCxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBRTlCLE1BQU0sR0FBRyxNQUFNLElBQUksWUFBWSxDQUFDO1FBQ2hDLE1BQU0sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQztvQkFDbEQscUJBQXFCLENBQUMsQ0FBQzthQUMxQjtTQUNGO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQzs7S0FFZDs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU87UUFFN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7WUFDRCxxQkFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBRXJCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFFeEMsdUJBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ2pCO2FBQ0Y7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ2pCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0QztLQUNGOzs7O0lBRUQsSUFBSSxlQUFlO1FBQ2pCLHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDO1lBQ0wsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtZQUN6QyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtZQUNuQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsMkJBQTJCO1NBQ2hFLENBQUM7S0FDSDtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgSnNFeHByZXNzaW9uSGVscGVyIHtcblxuICBjYWxjQk1JKGhlaWdodCwgd2VpZ2h0KSB7XG5cbiAgICBsZXQgcjtcbiAgICBpZiAoaGVpZ2h0ICYmIHdlaWdodCkge1xuICAgICAgciA9ICh3ZWlnaHQgLyAoaGVpZ2h0IC8gMTAwICogaGVpZ2h0IC8gMTAwKSkudG9GaXhlZCgxKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlaWdodCAmJiB3ZWlnaHQgPyBwYXJzZUZsb2F0KHIpIDogbnVsbDtcbiAgfVxuXG4gIGlzRW1wdHkodmFsKSB7XG5cbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycgfHwgdmFsID09PSAnbnVsbCcgfHwgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXJyYXlDb250YWlucyhhcnJheSwgbWVtYmVycykge1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVtYmVycykpIHtcblxuICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgY29udGFpbnMgPSB0cnVlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsID0gbWVtYmVyc1tpXTtcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICBjb250YWlucyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YobWVtYmVycykgIT09IC0xO1xuICAgIH1cbiAgfVxuICBleHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXMoa2V5LCBhcnJheSkge1xuICAgIGNvbnN0IHZhbHVlcyA9IGFycmF5Lm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW1ba2V5XTtcbiAgICB9KTtcbiAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICBmb3JtYXREYXRlKHZhbHVlLCBmb3JtYXQsIG9mZnNldCkge1xuXG4gICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkJztcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgJyswMzAwJztcblxuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcblxuICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGVGb3JtYXRFeGNlcHRpb246IHZhbHVlIHBhc3NlZCAnICtcbiAgICAgICAgICAnaXMgbm90IGEgdmFsaWQgZGF0ZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTsgLy8gVE9ETyBpbXBsZW1lbnQgdGhpc1xuICAgIC8vIHJldHVybiAkZmlsdGVyKCdkYXRlJykodmFsdWUsIGZvcm1hdCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGFycmF5Q29udGFpbnNBbnkoYXJyYXksIG1lbWJlcnMpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1lbWJlcnMpKSB7XG4gICAgICBpZiAobWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBsZXQgY29udGFpbnMgPSBmYWxzZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgY29uc3QgdmFsID0gbWVtYmVyc1tpXTtcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodmFsKSAhPT0gLTEpIHtcbiAgICAgICAgICBjb250YWlucyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YobWVtYmVycykgIT09IC0xO1xuICAgIH1cbiAgfVxuXG4gIGdldCBoZWxwZXJGdW5jdGlvbnMoKSB7XG4gICAgY29uc3QgaGVscGVyID0gdGhpcztcbiAgICByZXR1cm4ge1xuICAgICAgYXJyYXlDb250YWluc0FueTogaGVscGVyLmFycmF5Q29udGFpbnNBbnksXG4gICAgICBjYWxjQk1JOiBoZWxwZXIuY2FsY0JNSSxcbiAgICAgIGlzRW1wdHk6IGhlbHBlci5pc0VtcHR5LFxuICAgICAgYXJyYXlDb250YWluczogaGVscGVyLmFycmF5Q29udGFpbnMsXG4gICAgICBleHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXM6IGhlbHBlci5leHRyYWN0UmVwZWF0aW5nR3JvdXBWYWx1ZXMsXG4gICAgfTtcbiAgfVxufVxuIl19