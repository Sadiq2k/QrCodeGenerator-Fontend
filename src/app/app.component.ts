// app.component.ts
import { Component, OnInit } from '@angular/core';
import { QrCodeService } from './services/qr-code.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Note the correct attribute name is styleUrls
})
export class AppComponent implements OnInit {
  title = 'QrCodeGenerate-frontend';
  message: string = '';
  qrCodeImage: string | null = null;

  constructor(private qrCodeService: QrCodeService) { }

  ngOnInit(): void {
    // Initialize anything if needed
  }

  generateQRCode(): void {
    if (this.message.trim() === '') {
      this.qrCodeImage = null;
      return;
    }
    console.log(this.message)

    this.qrCodeService.generateQRCode(this.message).subscribe({
      
      next: (response) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.qrCodeImage = reader.result as string;
        };
        reader.readAsDataURL(response);
      },
      error: (err) => {
        console.error('Error generating QR code:', err);
      },
    });
  }

  clearInput(): void {
    this.message = '';
    this.qrCodeImage = null;
  }

  downloadQRCode(): void {
    if (this.qrCodeImage) {
      const link = document.createElement('a');
      link.href = this.qrCodeImage;
      link.download = 'QR-Code.png'; // Name of the file to be downloaded
      link.click();
    }
  }
}
