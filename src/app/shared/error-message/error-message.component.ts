import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  template: `
    <div *ngIf="control && control.invalid && control.touched" class="error-message">
      <ng-container ><small >{{message}}</small></ng-container>
   </div>
  `,
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl | null;
  @Input() message!: string;
}
