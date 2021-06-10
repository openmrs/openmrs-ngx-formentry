import { Injectable } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { AfeFormControl } from '../../public_api';
import { AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension';

@Injectable()
export class FormErrorsService {
  // Observable string sources
  public static control: AfeFormControl | AfeFormArray | AfeFormGroup = null;
  public static tab: number = null;
  public announceErrorFieldSource = new Subject<string>();
  public announceErrorField$: Observable<
    any
  > = this.announceErrorFieldSource.asObservable();
  public announceErrorField(error: string) {
    this.announceErrorFieldSource.next(error);
  }
}
