import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  private backendUrl = 'http://13.202.64.234:9111/qr-code';  // Include the protocol

  constructor(private http: HttpClient) {}

  generateQRCode(message: string): Observable<Blob> {
    const params = new HttpParams().set('message', message);
    return this.http.post<Blob>(`${this.backendUrl}/generate`, null, {
      params,
      responseType: 'blob' as 'json'  // Expecting a binary response
    })
    .pipe(
      catchError(error => {
        console.error('Error generating QR code:', error);
        return throwError(error);
      })
    );
  }


}
