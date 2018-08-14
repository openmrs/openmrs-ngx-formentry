/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Option } from '../question-models/select-option';
import { BehaviorSubject, of } from 'rxjs';
export class DummyDataSource {
    constructor() {
        this.returnErrorOnNext = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resolveSelectedValue(value) {
        let /** @type {?} */ selectOptions = this.sampleData();
        selectOptions = selectOptions.map(function (obj) {
            const /** @type {?} */ option = new Option({
                label: obj.label,
                value: obj.concept
            });
            return option;
        });
        selectOptions = selectOptions.filter(option => option.value === value);
        const /** @type {?} */ test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions[0]);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    fileUpload(url) {
        return of({ image: '' });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    fetchFile(url) {
        return of({ image: '' });
    }
    /**
     * @param {?} searchText
     * @return {?}
     */
    searchOptions(searchText) {
        let /** @type {?} */ selectOptions = this.sampleData();
        selectOptions = selectOptions.map(function (obj) {
            const /** @type {?} */ option = new Option({
                label: obj.label,
                value: obj.concept
            });
            return option;
        });
        selectOptions = selectOptions.filter(option => option.label.indexOf(searchText) !== -1);
        const /** @type {?} */ test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    }
    /**
     * @return {?}
     */
    sampleData() {
        return [
            {
                concept: 'a899e0ac-1350-11df-a1f1-0026b9348838',
                label: 'None'
            },
            {
                concept: 'a8ad1276-1350-11df-a1f1-0026b9348838',
                label: 'Breathlessness'
            },
            {
                concept: 'a892e4b4-1350-11df-a1f1-0026b9348838',
                label: 'Chest pain'
            },
            {
                concept: 'a8afc8b8-1350-11df-a1f1-0026b9348838',
                label: 'Cough = 2 weeks'
            },
            {
                concept: 'd7adae14-c386-49cc-8f7c-765d8ceec566',
                label: 'Fever for = 2 weeks'
            },
            {
                concept: '3f57aafc-7162-41da-a51b-6a804cb6f5e8',
                label: 'New exposure to household contact with TB'
            },
            {
                concept: 'a89807f0-1350-11df-a1f1-0026b9348838',
                label: 'Noticeable Weight loss'
            },
            {
                concept: 'e1862fef-68ed-4df4-90dd-a00152f719aa',
                label: 'Night sweats = 2 weeks'
            },
            {
                concept: 'a8ad462e-1350-11df-a1f1-0026b9348838',
                label: 'Abdomen'
            },
            {
                concept: 'f218c60e-4b54-475a-a4fa-facab9216da8',
                label: 'Groin'
            },
            {
                concept: 'a8a774b0-1350-11df-a1f1-0026b9348838',
                label: 'Joints'
            },
            {
                concept: '4639388c-ee31-4dcf-abb4-ad71253493bb',
                label: 'Neck Kw'
            }
        ];
    }
}
function DummyDataSource_tsickle_Closure_declarations() {
    /** @type {?} */
    DummyDataSource.prototype.options;
    /** @type {?} */
    DummyDataSource.prototype.option;
    /** @type {?} */
    DummyDataSource.prototype.returnErrorOnNext;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kdW1teS1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTFELE9BQU8sRUFBYyxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3ZELE1BQU07SUFLSjtpQ0FGb0IsS0FBSztLQUVSOzs7OztJQUVqQixvQkFBb0IsQ0FBQyxLQUFLO1FBQ3hCLHFCQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFdEMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHO1lBQzdDLHVCQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztnQkFDeEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNoQixLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNmLENBQUMsQ0FBQztRQUdILGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUNqQyxDQUFDO1FBRUYsdUJBQU0sSUFBSSxHQUF5QixJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzVCOzs7OztJQUNELFVBQVUsQ0FBQyxHQUFHO1FBQ1osTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUNELFNBQVMsQ0FBQyxHQUFHO1FBQ1gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUNELGFBQWEsQ0FBQyxVQUFVO1FBQ3RCLHFCQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFdEMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHO1lBQzdDLHVCQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztnQkFDeEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNoQixLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNmLENBQUMsQ0FBQztRQUdILGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNsRCxDQUFDO1FBRUYsdUJBQU0sSUFBSSxHQUF5QixJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMxQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzVCOzs7O0lBRUQsVUFBVTtRQUNSLE1BQU0sQ0FBQztZQUNMO2dCQUNFLE9BQU8sRUFBRSxzQ0FBc0M7Z0JBQy9DLEtBQUssRUFBRSxNQUFNO2FBQ2Q7WUFDRDtnQkFDRSxPQUFPLEVBQUUsc0NBQXNDO2dCQUMvQyxLQUFLLEVBQUUsZ0JBQWdCO2FBQ3hCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLHNDQUFzQztnQkFDL0MsS0FBSyxFQUFFLFlBQVk7YUFDcEI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsc0NBQXNDO2dCQUMvQyxLQUFLLEVBQUUsaUJBQWlCO2FBQ3pCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLHNDQUFzQztnQkFDL0MsS0FBSyxFQUFFLHFCQUFxQjthQUM3QjtZQUNEO2dCQUNFLE9BQU8sRUFBRSxzQ0FBc0M7Z0JBQy9DLEtBQUssRUFBRSwyQ0FBMkM7YUFDbkQ7WUFDRDtnQkFDRSxPQUFPLEVBQUUsc0NBQXNDO2dCQUMvQyxLQUFLLEVBQUUsd0JBQXdCO2FBQ2hDO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLHNDQUFzQztnQkFDL0MsS0FBSyxFQUFFLHdCQUF3QjthQUNoQztZQUNEO2dCQUNFLE9BQU8sRUFBRSxzQ0FBc0M7Z0JBQy9DLEtBQUssRUFBRSxTQUFTO2FBQ2pCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLHNDQUFzQztnQkFDL0MsS0FBSyxFQUFFLE9BQU87YUFDZjtZQUNEO2dCQUNFLE9BQU8sRUFBRSxzQ0FBc0M7Z0JBQy9DLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLHNDQUFzQztnQkFDL0MsS0FBSyxFQUFFLFNBQVM7YUFDakI7U0FFRixDQUFDO0tBQ0g7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9zZWxlY3Qtb3B0aW9uJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IGNsYXNzIER1bW15RGF0YVNvdXJjZSBpbXBsZW1lbnRzIERhdGFTb3VyY2Uge1xuICBvcHRpb25zOiBPYnNlcnZhYmxlPE9wdGlvbltdPjtcbiAgb3B0aW9uOiBPYnNlcnZhYmxlPE9wdGlvbj47XG4gIHJldHVybkVycm9yT25OZXh0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICByZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZSk6IE9ic2VydmFibGU8T3B0aW9uPiB7XG4gICAgbGV0IHNlbGVjdE9wdGlvbnMgPSB0aGlzLnNhbXBsZURhdGEoKTtcblxuICAgIHNlbGVjdE9wdGlvbnMgPSBzZWxlY3RPcHRpb25zLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICBjb25zdCBvcHRpb24gPSBuZXcgT3B0aW9uKHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvcHRpb247XG4gICAgfSk7XG5cblxuICAgIHNlbGVjdE9wdGlvbnMgPSBzZWxlY3RPcHRpb25zLmZpbHRlcihcbiAgICAgIG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHZhbHVlXG4gICAgKTtcblxuICAgIGNvbnN0IHRlc3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFtdKTtcbiAgICBpZiAoIXRoaXMucmV0dXJuRXJyb3JPbk5leHQpIHtcbiAgICAgIHRlc3QubmV4dChzZWxlY3RPcHRpb25zWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVzdC5lcnJvcihuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgT3B0aW9ucycpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGVzdC5hc09ic2VydmFibGUoKTtcbiAgfVxuICBmaWxlVXBsb2FkKHVybCkge1xuICAgIHJldHVybiBvZih7IGltYWdlOiAnJyB9KTtcbiAgfVxuICBmZXRjaEZpbGUodXJsKSB7XG4gICAgcmV0dXJuIG9mKHsgaW1hZ2U6ICcnIH0pO1xuICB9XG4gIHNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dCk6IE9ic2VydmFibGU8T3B0aW9uW10+IHtcbiAgICBsZXQgc2VsZWN0T3B0aW9ucyA9IHRoaXMuc2FtcGxlRGF0YSgpO1xuXG4gICAgc2VsZWN0T3B0aW9ucyA9IHNlbGVjdE9wdGlvbnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG5ldyBPcHRpb24oe1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9KTtcblxuXG4gICAgc2VsZWN0T3B0aW9ucyA9IHNlbGVjdE9wdGlvbnMuZmlsdGVyKFxuICAgICAgb3B0aW9uID0+IG9wdGlvbi5sYWJlbC5pbmRleE9mKHNlYXJjaFRleHQpICE9PSAtMVxuICAgICk7XG5cbiAgICBjb25zdCB0ZXN0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihbXSk7XG4gICAgaWYgKCF0aGlzLnJldHVybkVycm9yT25OZXh0KSB7XG4gICAgICB0ZXN0Lm5leHQoc2VsZWN0T3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlc3QuZXJyb3IobmV3IEVycm9yKCdFcnJvciBsb2FkaW5nIE9wdGlvbnMnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlc3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzYW1wbGVEYXRhKCk6IGFueSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2E4OTllMGFjLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgIGxhYmVsOiAnTm9uZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmNlcHQ6ICdhOGFkMTI3Ni0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLFxuICAgICAgICBsYWJlbDogJ0JyZWF0aGxlc3NuZXNzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2E4OTJlNGI0LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgIGxhYmVsOiAnQ2hlc3QgcGFpbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmNlcHQ6ICdhOGFmYzhiOC0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLFxuICAgICAgICBsYWJlbDogJ0NvdWdoID0gMiB3ZWVrcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmNlcHQ6ICdkN2FkYWUxNC1jMzg2LTQ5Y2MtOGY3Yy03NjVkOGNlZWM1NjYnLFxuICAgICAgICBsYWJlbDogJ0ZldmVyIGZvciA9IDIgd2Vla3MnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25jZXB0OiAnM2Y1N2FhZmMtNzE2Mi00MWRhLWE1MWItNmE4MDRjYjZmNWU4JyxcbiAgICAgICAgbGFiZWw6ICdOZXcgZXhwb3N1cmUgdG8gaG91c2Vob2xkIGNvbnRhY3Qgd2l0aCBUQidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmNlcHQ6ICdhODk4MDdmMC0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLFxuICAgICAgICBsYWJlbDogJ05vdGljZWFibGUgV2VpZ2h0IGxvc3MnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25jZXB0OiAnZTE4NjJmZWYtNjhlZC00ZGY0LTkwZGQtYTAwMTUyZjcxOWFhJyxcbiAgICAgICAgbGFiZWw6ICdOaWdodCBzd2VhdHMgPSAyIHdlZWtzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2E4YWQ0NjJlLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgIGxhYmVsOiAnQWJkb21lbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmNlcHQ6ICdmMjE4YzYwZS00YjU0LTQ3NWEtYTRmYS1mYWNhYjkyMTZkYTgnLFxuICAgICAgICBsYWJlbDogJ0dyb2luJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2E4YTc3NGIwLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgIGxhYmVsOiAnSm9pbnRzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJzQ2MzkzODhjLWVlMzEtNGRjZi1hYmI0LWFkNzEyNTM0OTNiYicsXG4gICAgICAgIGxhYmVsOiAnTmVjayBLdydcbiAgICAgIH1cblxuICAgIF07XG4gIH1cblxufVxuIl19