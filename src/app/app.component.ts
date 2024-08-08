import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QrCodeService } from './services/qr-code.service';
import { response } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck {
  title = 'QrCodeGenerate-frontend';

  message: string = '';
  qrCodeImage: string | null = null;

  constructor(private qrCodeService: QrCodeService) { }

  ngDoCheck(): void {
    if (this.message.trim() === '') {
      this.qrCodeImage = null;
      return;
    }
  }

  generateQRCode() {
    this.qrCodeService.generateQRCode(this.message).subscribe({
      next: (response) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.qrCodeImage = reader.result as string;
        };
        reader.readAsDataURL(response);
      }, error(err) {
        console.error('Error generating QR code:', err);
      },
    })
  }

  clearInput() {
    this.message = '';
    this.qrCodeImage = null;
  }

  downloadQRCode() {
    if (this.qrCodeImage) {
      const link = document.createElement('a');
      link.href = this.qrCodeImage;
      link.download = 'QR-Code.png'; // Name of the file to be downloaded
      link.click();
    }
  }

}
