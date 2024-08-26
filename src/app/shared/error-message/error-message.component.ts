import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'r2q-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="control && control.invalid && control.touched" class="error-message">
      <small *ngIf="control.hasError('required')">This field is required.</small>
      <small *ngIf="control.hasError('email')">Invalid email address.</small>
      <small *ngIf="control.hasError('maxlength')">Vendor Name cannot exceed 100 characters.</small>
      <small *ngIf="control.hasError('pattern')">Invalid Phone Number.</small>
    </div>
  `,
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl | null;
}
