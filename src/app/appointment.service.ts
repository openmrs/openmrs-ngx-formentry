import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSummaryService {
  private cache: { [key: string]: Observable<any> } = {};
  constructor(private readonly httpClient: HttpClient) {}

  public fetchAppointmentSummaryByDateRange(
    startDate: string,
    endDate: string
  ): Observable<any> {
    const cacheKey = `${startDate}-${endDate}`;

    if (!this.cache[cacheKey]) {  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('admin:Admin123')}`
      });

      const url = `https://uat.kenyahmis.org/openmrs/ws/rest/v1/appointment/appointmentSummary?startDate=${startDate}&endDate=${endDate}`;

      this.cache[cacheKey] = this.httpClient
        .get(url, { headers: headers })
        .pipe(
          shareReplay(1),
          catchError((error) => {
            delete this.cache[cacheKey]; // Remove failed request from cache
            return of(null); // or throw an error if you prefer
          })
        );
    }

    return this.cache[cacheKey];
  }
}
