import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  //TODO: Define the server URL where you will handle file uploads
  private uploadUrl = 'server-api';

  // Implement a method to upload the diagram file
  uploadDiagram(file: File): Observable<any> {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('diagramFile', file);

    // Define HTTP headers for the request (you can adjust them as needed)
    const headers = new HttpHeaders({
      //TODO: provide auth if required
      Authorization: 'Bearer YourAuthToken', // Include any authentication headers if required
    });

    // Make an HTTP POST request to upload the file
    return this.http.post(this.uploadUrl, formData, { headers });
  }
}
