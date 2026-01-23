import { Component, OnInit, Inject } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';

import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
@Component({
  selector: 'ofe-sample-form',
  templateUrl: 'sample-form.component.html'
})
export class SampleFormComponent implements OnInit {
  form: UntypedFormGroup;
  payLoad = '';
  fb: UntypedFormBuilder;

  group1: UntypedFormGroup;
  array1: UntypedFormArray;
  group2: UntypedFormGroup;
  array2: UntypedFormArray;

  array3: UntypedFormArray;
  group3: UntypedFormGroup;

  group4: UntypedFormGroup;
  array4: UntypedFormArray;

  control1: AfeFormControl;
  control2: AfeFormControl;
  control3: AfeFormControl;
  control4: AfeFormControl;
  control5: AfeFormControl;
  control6: AfeFormControl;
  control7: AfeFormControl;
  control8: AfeFormControl;
  control9: AfeFormControl;
  control10: AfeFormControl;
  control11: AfeFormControl;

  control9Removed = false;

  // control5LastUpdate: any;
  // control4LastUpdate: any;

  constructor(@Inject(UntypedFormBuilder) fb: UntypedFormBuilder) {
    this.fb = fb;
  }
  ngOnInit() {
    this.generateFormGroup();
    this.wireValidations();
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

  private generateFormGroup() {
    // NOTE: DO NOT DELETE THIS COMMENTED LINES AS IT ACT AS THE TREE STRUCTURE FOR OUR FORM
    // this.form = this.fb.group(
    //     {
    //         1: 'first',
    //         2: this.fb.group({
    //             3: this.fb.array([
    //                 'second'
    //             ]),
    //             4: this.fb.group({
    //                 6: 'third',
    //                 7: 'forth'
    //             }),
    //             5: 'fifth'
    //         }),
    //         8: this.fb.array([
    //             this.fb.group({
    //                 9: 'sixth',
    //                 10: 'seventh'
    //             }),
    //             'eigth',
    //             this.fb.array([
    //                 'ninth'
    //             ]),
    //             'tenth',
    //             'eleventh'
    //         ])
    //     }
    // );

    this.form = this.getNewGroupControl();

    // control 1
    this.control1 = this.getNewControl();
    this.control1.setValue('first');
    this.form.addControl('1', this.control1);

    this.group1 = this.getNewGroupControl();
    this.form.addControl('2', this.group1);

    this.array1 = this.getNewControlArray();
    this.group1.addControl('3', this.array1);

    this.group2 = this.getNewGroupControl();
    this.group1.addControl('4', this.group2);

    this.array3 = this.getNewControlArray();
    this.form.addControl('8', this.array3);

    this.group4 = this.getNewGroupControl();
    this.array3.setControl(0, this.group4);

    // control 2
    this.control2 = this.getNewControl();
    this.control2.setValue('second');
    this.array1.setControl(0, this.control2);

    // control 3
    this.control3 = this.getNewControl();
    this.control3.setValue('third');
    this.group2.addControl('6', this.control3);

    // control 4
    this.control4 = this.getNewControl();
    this.control4.setValue('forth');
    this.group2.addControl('7', this.control4);

    // control 5
    this.control5 = this.getNewControl();
    this.control5.setValue('fifth');
    this.group1.addControl('5', this.control5);

    // control 6
    this.control6 = this.getNewControl();
    this.control6.setValue('sixth');
    this.group4.addControl('9', this.control6);

    // control 7
    this.control7 = this.getNewControl();
    this.control7.setValue('seventh');
    this.group4.addControl('10', this.control7);

    // control 8
    this.control8 = this.getNewControl();
    this.control8.setValue('eigth');
    this.array3.setControl(1, this.control8);

    this.array4 = this.getNewControlArray();
    this.array3.setControl(2, this.array4);

    // control 9
    this.control9 = this.getNewControl();
    this.control9.setValue('ninth');
    this.array4.setControl(0, this.control9);

    // control 10
    this.control10 = this.getNewControl();
    this.control10.setValue('tenth');
    this.array3.setControl(3, this.control10);

    // control 11
    this.control11 = this.getNewControl();
    this.control11.setValue('eleventh');
    this.array3.setControl(4, this.control11);
  }

  private wireValidations() {
    // 1 a) cyclic relations validation and b) ancestor listents to child validation
    // 4th vs 5th
    this.control4.setValidators(
      this.forbiddenValueValidator(this.control5, 'forth')
    );
    // this.wireRelation(this.control4, this.control5, true);
    this.control4.controlRelations.addRelatedControls(this.control5);

    this.control5.setValidators(
      this.forbiddenValueValidator(this.control4, 'fifth')
    );
    // this.wireRelationB(this.control5, this.control4, true);
    this.control5.controlRelations.addRelatedControls(this.control4);

    // 2 child listens to ancestor
    // 3rd vs 1st
    this.control3.setValidators(
      this.forbiddenValueValidator(this.control1, 'third')
    );
    // this.wireRelation(this.control3, this.control1);
    this.control3.controlRelations.addRelatedControls(this.control1);

    // 3 Deep controls: one leaf in one branch listens to another leaf in a separate branch connected
    // to each other by the root
    // 2nd vs 6th
    this.control2.setValidators(
      this.forbiddenValueValidator(this.control6, 'second')
    );
    // this.wireRelation(this.control2, this.control6);
    this.control2.controlRelations.addRelatedControls(this.control6);

    // 4 controls in the same group listening to each other
    // 6th vs 7th
    this.control6.setValidators(
      this.forbiddenValueValidator(this.control7, 'sixth')
    );
    // this.wireRelation(this.control6, this.control7);
    this.control6.controlRelations.addRelatedControls(this.control7);

    // 5 controls in the same array listening to each other
    // 10th vs 11th
    this.control10.setValidators(
      this.forbiddenValueValidator(this.control11, 'eleventh')
    );
    // this.wireRelation(this.control10, this.control11);
    this.control10.controlRelations.addRelatedControls(this.control11);

    // 6 When one control is removed and the other has to be aware of that change
    // 1st vs 9th control form array i.e array4
    this.control1.setValidators(
      this.formArrayMissingValueValidator(this.array4, 'first')
    );
    // this.wireRelation(this.control1, this.array4);
    this.control1.controlRelations.addRelatedControls(this.array4);

    this.form.statusChanges.subscribe(() => {});

    this.form.valueChanges.subscribe(() => {});
  }

  // private wireRelation(a: AbstractControl, b: AbstractControl, isCyclic = false): void {
  //     b.valueChanges.subscribe((val) => {
  //         if (isCyclic === true) {
  //             if (this.control5LastUpdate !== val) {
  //                 this.control5LastUpdate = val;
  //                 a.updateValueAndValidity();
  //             }
  //         } else {
  //             a.updateValueAndValidity();
  //         }
  //     });
  // }

  // private wireRelationB(a: AbstractControl, b: AbstractControl, isCyclic = false): void {
  //     b.valueChanges.subscribe((val) => {
  //         if (isCyclic === true) {
  //             if (this.control4LastUpdate !== val) {
  //                 this.control4LastUpdate = val;
  //                 a.updateValueAndValidity();
  //             }
  //         } else {
  //             a.updateValueAndValidity();
  //         }
  //     });
  // }

  private getNewControl(): AfeFormControl {
    return new AfeFormControl();
  }

  private getNewControlArray(): UntypedFormArray {
    return new UntypedFormArray([]);
  }

  private getNewGroupControl(): UntypedFormGroup {
    return new UntypedFormGroup({});
  }

  public setControlOneValue() {
    this.control2.patchValue('failed');
  }

  public removeControlNine() {
    this.control9Removed = true;
    this.array4.removeAt(0);
  }

  // Validators to help with change-tracking
  private forbiddenValueValidator(
    refControl: AbstractControl,
    controlName: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const hasFailedValidation = refControl.value === 'failed';

      return hasFailedValidation ? { forbiddenValue: { name } } : null;
    };
  }

  private formArrayMissingValueValidator(
    refControl: UntypedFormArray,
    controlName: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const arrayVal = refControl.value as Array<any>;
      const hasFailedValidation = arrayVal.length === 0;

      return hasFailedValidation ? { forbiddenValue: { name } } : null;
    };
  }
}
