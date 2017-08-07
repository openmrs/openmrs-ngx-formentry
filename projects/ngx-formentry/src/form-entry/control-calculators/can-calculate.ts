export interface CanCalculate {
  calculator: Function;
  setCalculatorFn(newCalculator: Function);
  updateCalculatedValue();
}
