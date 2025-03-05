import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LeafNode } from '../form-factory/form-node';
import { Identifier } from '../value-adapters/types';
import { Messages } from '../utils/messages';

@Directive({
  selector: '[ofePatientIdentifierValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: PatientIdentifierValidatorDirective,
      multi: true
    }
  ]
})
export class PatientIdentifierValidatorDirective implements AsyncValidator {
  @Input('ofePatientIdentifierValidator') node: LeafNode;
  @Input() currentPatientId?: string;

  constructor(private http: HttpClient) { }

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // should only validate control with type patientIdentifier
    if (this.node?.question.type !== 'patientIdentifier') {
      return of(null);
    }

    // We should not validate if the control has initial value and value is not changed
    // This happens in edit mode
    if (control?.value === this.node?.initialValue) {
      return of(null);
    }

    const identifier = control.value;
    const currentPatientExistingIdentifier: Array<Identifier> =
      this.node.form.valueProcessingInfo?.patientIdentifiers ?? [];

    if (
      currentPatientExistingIdentifier.some(
        (id) => id.identifier === identifier
      )
    ) {
      // Disable the control, since the identifier is already assigned to the patient
      control.disable();
      return of(null);
    }

    // If the identifier is less than 3 characters, no need to validate
    if (!identifier || identifier.length < 3) {
      return of(null);
    }

    return of(identifier).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((id) => this.validateIdentifier(id)),
      map((response) => {
        if (
          response.isAssigned &&
          response.patientId !== this.currentPatientId
        ) {
          return {
            identifierTaken: {
              message: Messages.identifierTaken
            }
          };
        }
        return null;
      }),
      catchError(() =>
        of({
          identifierError: {
            message: Messages.identifierError
          }
        })
      )
    );
  }

  private validateIdentifier(identifier: string): Observable<any> {
    // For testing purposes, change openmrsBase to the OpenMRS server you are using
    const baseUrl = window?.['openmrsBase'] + '/ws/rest/v1' + '/';
    const apiUrl = `${baseUrl}patient`;

    const params = new HttpParams().set('q', identifier);

    return this.http.get(apiUrl, { params }).pipe(
      map((response: any) => {
        const results = response.results || [];
        return {
          isAssigned: results.length > 0,
          patientId: results.length > 0 ? results[0].uuid : undefined
        };
      }),
      catchError((error) => {
        console.error('Error searching for patient:', error);
        throw error;
      })
    );
  }
}
