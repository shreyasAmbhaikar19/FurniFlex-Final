import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent {
  baseUrl: string = 'http://localhost:3000/'; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: { order: any }) { }

  getImageUrl(image: string): string {
    if (image) {
      const correctedPath = image.replace(/\\/g, '/');
      return `${this.baseUrl}${correctedPath}`;
    }
    return 'https://via.placeholder.com/150';
  }
}
