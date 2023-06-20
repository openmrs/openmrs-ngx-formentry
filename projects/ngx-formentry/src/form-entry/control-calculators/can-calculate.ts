export interface CanCalculate {
  calculator: Function;
  setCalculatorFn(newCalculator: () => Promise<any>);
  updateCalculatedValue();
}
