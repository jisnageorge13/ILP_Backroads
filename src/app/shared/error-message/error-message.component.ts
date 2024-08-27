import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'r2q-error-message',
  template: `
    <div *ngIf="control && control.invalid && control.touched" class="error-message">
      <ng-container [ngSwitch]="true">
       <small *ngSwitchCase="control.hasError('required')">This field is required.</small>
       <small *ngSwitchCase="control.hasError('email')">Invalid email address.</small>
       <small *ngSwitchCase="control.hasError('maxlength')">Vendor Name cannot exceed 100 characters.</small>
       <small *ngSwitchCase="control.hasError('pattern')">Invalid Phone Number.</small>
       <small *ngSwitchDefault>Invalid input.</small>
      </ng-container>
   </div>
  `,
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl | null;
}
