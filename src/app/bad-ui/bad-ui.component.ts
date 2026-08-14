import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BadCaptchaComponent } from './bad-captcha/bad-captcha.component';
import { BadTermsAndConditionsComponent } from './bad-terms-and-conditions/bad-terms-and-conditions.component';

@Component({
  selector: 'app-bad-ui',
  templateUrl: './bad-ui.component.html',
  styleUrls: ['./bad-ui.component.scss'],
  standalone: true,
  imports: [
    MatExpansionModule,
    BadCaptchaComponent,
    BadTermsAndConditionsComponent
  ]
})
export class BadUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
