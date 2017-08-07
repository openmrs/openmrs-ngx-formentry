import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class FormErrorsService {

  // Observable string sources
  public static control: AbstractControl = null;
  public static tab: number = null;
  public announceErrorFieldSource = new Subject<string>();
  public announceErrorField$: Observable<any> = this.announceErrorFieldSource.asObservable();
  public announceErrorField(error: string) {
    this.announceErrorFieldSource.next(error);
  }
}
