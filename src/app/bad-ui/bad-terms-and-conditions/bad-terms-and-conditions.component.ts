import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bad-terms-and-conditions',
  templateUrl: './bad-terms-and-conditions.component.html',
  styleUrls: ['./bad-terms-and-conditions.component.scss']
})
export class BadTermsAndConditionsComponent implements OnInit {

  currentText: string = '';
  terms: string = `These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and benyocum.com (“we,” “us” or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).

You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.

Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.

We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions, and you waive any right to receive specific notice of each such change.

It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Site after the date such revised Terms and Conditions are posted.`;
  displayInputTextArea: boolean = false;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit() {
    this.snackBar.open('Congratulations, you did it!');
  }
}
