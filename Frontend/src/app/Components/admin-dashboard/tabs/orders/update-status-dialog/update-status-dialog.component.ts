import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-status-dialog',
  templateUrl: './update-status-dialog.component.html',
})
export class UpdateStatusDialogComponent {
  updateOrderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: any }
  ) {
    this.updateOrderForm = this.fb.group({
      status: [this.data.order.status || '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    if (this.updateOrderForm.valid) {
      this.dialogRef.close(this.updateOrderForm.value.status);
    }
  }
}
