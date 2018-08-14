export interface ValueChangeListener {
    addValueChangeListener(func: any): any;
    fireValueChangeListener(value: any): any;
}
