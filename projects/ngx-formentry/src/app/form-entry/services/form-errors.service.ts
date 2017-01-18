import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class FormErrorsService {

  // Observable string sources
  public static control: AbstractControl;
  public static tab: number;
  private announceErrorFieldSource = new Subject<string>();

  announceErrorField$ = this.announceErrorFieldSource.asObservable();

  announceErrorField(error: string) {
    this.announceErrorFieldSource.next(error);
  }
}
