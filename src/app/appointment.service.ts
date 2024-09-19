import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSummaryService {
  constructor(private readonly httpClient: HttpClient) {}

  public fetchAppointmentSummaryByDateRange(
    startDate: string,
    endDate: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa('admin:Admin123')}`
    });
    const appointmentSummaryUrl = `https://dev.kenyahmis.org/openmrs/ws/rest/v1/appointment/appointmentSummary?startDate=${startDate}&endDate=${endDate}`;
    return this.httpClient.get(appointmentSummaryUrl, { headers: headers });
  }
}
