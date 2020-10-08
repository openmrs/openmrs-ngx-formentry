export interface ValueChangeListener {
  addValueChangeListener(func: any);

  fireValueChangeListener(value: any);
}
