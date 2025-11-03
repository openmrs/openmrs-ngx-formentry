import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

export interface ConceptReferenceRangeItem {
  uuid: string;
  display: string;
  concept: string;
  hiNormal: number;
  hiAbsolute: number;
  hiCritical: number;
  lowNormal: number;
  lowAbsolute: number;
  lowCritical: number;
  units?: string;
  allowDecimal?: boolean;
}

export interface ConceptReferenceRangeResponse {
  results: ConceptReferenceRangeItem[];
}

@Injectable({ providedIn: 'root' })
export class ConceptReferenceRangeService {
  private cache: Map<
    string,
    Observable<ConceptReferenceRangeItem | null>
  > = new Map();

  constructor(private http: HttpClient) {}

  public getReferenceRange(
    patientUuid: string,
    conceptUuid: string
  ): Observable<ConceptReferenceRangeItem | null> {
    console.log('getReferenceRange', patientUuid, conceptUuid);

    const cacheKey = `${patientUuid}::${conceptUuid}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const base: string = (window as any)?.['openmrsBase']
      ? (window as any)['openmrsBase']
      : '/openmrs';
    const url = `${base}/ws/rest/v1/conceptreferencerange`;
    const params = new HttpParams()
      .set('patient', patientUuid)
      .set('concept', conceptUuid)
      .set('v', 'full');

    const req$ = this.http
      .get<ConceptReferenceRangeResponse>(url, { params })
      .pipe(
        map((res) => {
          console.log(res);
          const first =
            res && res.results && res.results.length > 0
              ? res.results[0]
              : null;
          return first;
        }),
        catchError((err) => {
          // Swallow errors and return null so UI does not break
          // Consumers can decide to no-op when null
          return of(null);
        }),
        shareReplay(1)
      );

    this.cache.set(cacheKey, req$);
    return req$;
  }
}
