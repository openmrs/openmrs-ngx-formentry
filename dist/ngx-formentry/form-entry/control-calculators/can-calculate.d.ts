export interface CanCalculate {
    calculator: Function;
    setCalculatorFn(newCalculator: Function): any;
    updateCalculatedValue(): any;
}
