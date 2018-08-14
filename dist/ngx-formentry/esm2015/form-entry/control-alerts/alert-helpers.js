/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class AlertHelper {
    /**
     * @param {?} control
     * @return {?}
     */
    hideAlert(control) {
        control.shown = false;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    showAlert(control) {
        control.shown = true;
    }
    /**
     * @param {?} control
     * @param {?} alert
     * @return {?}
     */
    setAlertsForControl(control, alert) {
        control.alerts.push(alert);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    clearAlertsForControl(control) {
        control.alerts.splice(0);
        control.alert = '';
    }
    /**
     * @param {?} control
     * @return {?}
     */
    evaluateControlAlerts(control) {
        let /** @type {?} */ messageValue = '';
        control.alerts.forEach(message => {
            message.reEvaluateAlertExpression();
            if (message.shown === true) {
                messageValue = message.alertMessage;
            }
            else {
                messageValue = '';
            }
        });
        control.alert = messageValue;
        // if (control.message && control.disable) {
        //     control.disable();
        //     // control.setValue(null);
        // }
    }
    /**
     * @param {?} control
     * @return {?}
     */
    setUpReEvaluationWhenValueChanges(control) {
        if (control.updateAlert) {
            control.valueChanges.subscribe((val) => {
                control.updateAlert();
            });
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvY29udHJvbC1hbGVydHMvYWxlcnQtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsTUFBTTs7Ozs7SUFFSyxTQUFTLENBQUMsT0FBYztRQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozs7O0lBR25CLFNBQVMsQ0FBQyxPQUFjO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7Ozs7O0lBR2xCLG1CQUFtQixDQUFDLE9BQXlCLEVBQUUsS0FBWTtRQUM5RCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBR3hCLHFCQUFxQixDQUFDLE9BQXlCO1FBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUFHaEIscUJBQXFCLENBQUMsT0FBeUI7UUFDbEQscUJBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3ZDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osWUFBWSxHQUFHLEVBQUUsQ0FBQzthQUNyQjtTQUNKLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDOzs7Ozs7Ozs7O0lBTzFCLGlDQUFpQyxDQUFDLE9BQXlCO1FBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN6QixDQUFDLENBQUM7U0FDTjs7Q0FHUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbkdlbmVyYXRlQWxlcnQsIEFsZXJ0IH0gZnJvbSAnLi9jYW4tZ2VuZXJhdGUtYWxlcnQnO1xuZXhwb3J0IGNsYXNzIEFsZXJ0SGVscGVyIHtcblxuICAgIHB1YmxpYyBoaWRlQWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5zaG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QWxlcnQoY29udHJvbDogQWxlcnQpIHtcbiAgICAgICAgY29udHJvbC5zaG93biA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCwgYWxlcnQ6IEFsZXJ0KSB7XG4gICAgICAgIGNvbnRyb2wuYWxlcnRzLnB1c2goYWxlcnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckFsZXJ0c0ZvckNvbnRyb2woY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5zcGxpY2UoMCk7XG4gICAgICAgIGNvbnRyb2wuYWxlcnQgPSAnJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZXZhbHVhdGVDb250cm9sQWxlcnRzKGNvbnRyb2w6IENhbkdlbmVyYXRlQWxlcnQpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VWYWx1ZSA9ICcnO1xuICAgICAgICBjb250cm9sLmFsZXJ0cy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZS5yZUV2YWx1YXRlQWxlcnRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5zaG93biA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VWYWx1ZSA9IG1lc3NhZ2UuYWxlcnRNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlVmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udHJvbC5hbGVydCA9IG1lc3NhZ2VWYWx1ZTtcbiAgICAgICAgLy8gaWYgKGNvbnRyb2wubWVzc2FnZSAmJiBjb250cm9sLmRpc2FibGUpIHtcbiAgICAgICAgLy8gICAgIGNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICAvLyAgICAgLy8gY29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVcFJlRXZhbHVhdGlvbldoZW5WYWx1ZUNoYW5nZXMoY29udHJvbDogQ2FuR2VuZXJhdGVBbGVydCkge1xuICAgICAgICBpZiAoY29udHJvbC51cGRhdGVBbGVydCkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sLnVwZGF0ZUFsZXJ0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19