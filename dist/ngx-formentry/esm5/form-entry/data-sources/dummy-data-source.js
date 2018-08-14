/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Option } from '../question-models/select-option';
import { BehaviorSubject, of } from 'rxjs';
var DummyDataSource = /** @class */ (function () {
    function DummyDataSource() {
        this.returnErrorOnNext = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DummyDataSource.prototype.resolveSelectedValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ selectOptions = this.sampleData();
        selectOptions = selectOptions.map(function (obj) {
            var /** @type {?} */ option = new Option({
                label: obj.label,
                value: obj.concept
            });
            return option;
        });
        selectOptions = selectOptions.filter(function (option) { return option.value === value; });
        var /** @type {?} */ test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions[0]);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    };
    /**
     * @param {?} url
     * @return {?}
     */
    DummyDataSource.prototype.fileUpload = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return of({ image: '' });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    DummyDataSource.prototype.fetchFile = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return of({ image: '' });
    };
    /**
     * @param {?} searchText
     * @return {?}
     */
    DummyDataSource.prototype.searchOptions = /**
     * @param {?} searchText
     * @return {?}
     */
    function (searchText) {
        var /** @type {?} */ selectOptions = this.sampleData();
        selectOptions = selectOptions.map(function (obj) {
            var /** @type {?} */ option = new Option({
                label: obj.label,
                value: obj.concept
            });
            return option;
        });
        selectOptions = selectOptions.filter(function (option) { return option.label.indexOf(searchText) !== -1; });
        var /** @type {?} */ test = new BehaviorSubject([]);
        if (!this.returnErrorOnNext) {
            test.next(selectOptions);
        }
        else {
            test.error(new Error('Error loading Options'));
        }
        return test.asObservable();
    };
    /**
     * @return {?}
     */
    DummyDataSource.prototype.sampleData = /**
     * @return {?}
     */
    function () {
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
    };
    return DummyDataSource;
}());
export { DummyDataSource };
function DummyDataSource_tsickle_Closure_declarations() {
    /** @type {?} */
    DummyDataSource.prototype.options;
    /** @type {?} */
    DummyDataSource.prototype.option;
    /** @type {?} */
    DummyDataSource.prototype.returnErrorOnNext;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kdW1teS1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTFELE9BQU8sRUFBYyxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3ZELElBQUE7SUFLRTtpQ0FGb0IsS0FBSztLQUVSOzs7OztJQUVqQiw4Q0FBb0I7Ozs7SUFBcEIsVUFBcUIsS0FBSztRQUN4QixxQkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXRDLGFBQWEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRztZQUM3QyxxQkFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDZixDQUFDLENBQUM7UUFHSCxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FDbEMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBdEIsQ0FBc0IsQ0FDakMsQ0FBQztRQUVGLHFCQUFNLElBQUksR0FBeUIsSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDaEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFL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IH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1vcHRpb24nO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcblxuXG5leHBvcnQgY2xhc3MgRHVtbXlEYXRhU291cmNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XG4gIG9wdGlvbnM6IE9ic2VydmFibGU8T3B0aW9uW10+O1xuICBvcHRpb246IE9ic2VydmFibGU8T3B0aW9uPjtcbiAgcmV0dXJuRXJyb3JPbk5leHQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlKTogT2JzZXJ2YWJsZTxPcHRpb24+IHtcbiAgICBsZXQgc2VsZWN0T3B0aW9ucyA9IHRoaXMuc2FtcGxlRGF0YSgpO1xuXG4gICAgc2VsZWN0T3B0aW9ucyA9IHNlbGVjdE9wdGlvbnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG5ldyBPcHRpb24oe1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9KTtcblxuXG4gICAgc2VsZWN0T3B0aW9ucyA9IHNlbGVjdE9wdGlvbnMuZmlsdGVyKFxuICAgICAgb3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PT0gdmFsdWVcbiAgICApO1xuXG4gICAgY29uc3QgdGVzdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oW10pO1xuICAgIGlmICghdGhpcy5yZXR1cm5FcnJvck9uTmV4dCkge1xuICAgICAgdGVzdC5uZXh0KHNlbGVjdE9wdGlvbnNbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXN0LmVycm9yKG5ldyBFcnJvcignRXJyb3IgbG9hZGluZyBPcHRpb25zJykpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIGZpbGVVcGxvYWQodXJsKSB7XG4gICAgcmV0dXJuIG9mKHsgaW1hZ2U6ICcnIH0pO1xuICB9XG4gIGZldGNoRmlsZSh1cmwpIHtcbiAgICByZXR1cm4gb2YoeyBpbWFnZTogJycgfSk7XG4gIH1cbiAgc2VhcmNoT3B0aW9ucyhzZWFyY2hUZXh0KTogT2JzZXJ2YWJsZTxPcHRpb25bXT4ge1xuICAgIGxldCBzZWxlY3RPcHRpb25zID0gdGhpcy5zYW1wbGVEYXRhKCk7XG5cbiAgICBzZWxlY3RPcHRpb25zID0gc2VsZWN0T3B0aW9ucy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgY29uc3Qgb3B0aW9uID0gbmV3IE9wdGlvbih7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gb3B0aW9uO1xuICAgIH0pO1xuXG5cbiAgICBzZWxlY3RPcHRpb25zID0gc2VsZWN0T3B0aW9ucy5maWx0ZXIoXG4gICAgICBvcHRpb24gPT4gb3B0aW9uLmxhYmVsLmluZGV4T2Yoc2VhcmNoVGV4dCkgIT09IC0xXG4gICAgKTtcblxuICAgIGNvbnN0IHRlc3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFtdKTtcbiAgICBpZiAoIXRoaXMucmV0dXJuRXJyb3JPbk5leHQpIHtcbiAgICAgIHRlc3QubmV4dChzZWxlY3RPcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVzdC5lcnJvcihuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgT3B0aW9ucycpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGVzdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHNhbXBsZURhdGEoKTogYW55IHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBjb25jZXB0OiAnYTg5OWUwYWMtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcbiAgICAgICAgbGFiZWw6ICdOb25lJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2E4YWQxMjc2LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgIGxhYmVsOiAnQnJlYXRobGVzc25lc3MnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25jZXB0OiAnYTg5MmU0YjQtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcbiAgICAgICAgbGFiZWw6ICdDaGVzdCBwYWluJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2E4YWZjOGI4LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgIGxhYmVsOiAnQ291Z2ggPSAyIHdlZWtzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2Q3YWRhZTE0LWMzODYtNDljYy04ZjdjLTc2NWQ4Y2VlYzU2NicsXG4gICAgICAgIGxhYmVsOiAnRmV2ZXIgZm9yID0gMiB3ZWVrcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmNlcHQ6ICczZjU3YWFmYy03MTYyLTQxZGEtYTUxYi02YTgwNGNiNmY1ZTgnLFxuICAgICAgICBsYWJlbDogJ05ldyBleHBvc3VyZSB0byBob3VzZWhvbGQgY29udGFjdCB3aXRoIFRCJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2E4OTgwN2YwLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgIGxhYmVsOiAnTm90aWNlYWJsZSBXZWlnaHQgbG9zcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbmNlcHQ6ICdlMTg2MmZlZi02OGVkLTRkZjQtOTBkZC1hMDAxNTJmNzE5YWEnLFxuICAgICAgICBsYWJlbDogJ05pZ2h0IHN3ZWF0cyA9IDIgd2Vla3MnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25jZXB0OiAnYThhZDQ2MmUtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcbiAgICAgICAgbGFiZWw6ICdBYmRvbWVuJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29uY2VwdDogJ2YyMThjNjBlLTRiNTQtNDc1YS1hNGZhLWZhY2FiOTIxNmRhOCcsXG4gICAgICAgIGxhYmVsOiAnR3JvaW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25jZXB0OiAnYThhNzc0YjAtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcbiAgICAgICAgbGFiZWw6ICdKb2ludHMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb25jZXB0OiAnNDYzOTM4OGMtZWUzMS00ZGNmLWFiYjQtYWQ3MTI1MzQ5M2JiJyxcbiAgICAgICAgbGFiZWw6ICdOZWNrIEt3J1xuICAgICAgfVxuXG4gICAgXTtcbiAgfVxuXG59XG4iXX0=