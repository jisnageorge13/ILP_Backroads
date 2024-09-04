import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class Constants {
    phonePattern: RegExp;
    urlPattern: RegExp;
    confirmCancelMessage  :string;
    confirmApprovalMessage  :string;
  
    constructor() {
      this.phonePattern = /^[1-9][0-9]{9}$/;
      this.urlPattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      this.confirmCancelMessage  ="Are you sure you want to cancel the changes?";
      this.confirmApprovalMessage  ="Are you sure you want to approve this vendor?";
    }
}