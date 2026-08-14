import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bad-captcha',
  templateUrl: './bad-captcha.component.html',
  styleUrls: ['./bad-captcha.component.scss']
})
export class BadCaptchaComponent implements OnInit {

  private toggleChangeArray = [
    [true, false, true, true, false, false, true, false, true],
    [true, true, false, false, false, true, false, true, true],
    [true, true, true, false, true, false, false, true, false],
    [false, false, true, true, false, false, false, false, true],
    [false, false, false, false, true, false, true, true, true],
    [true, false, false, false, false, true, false, false, false],
    [false, true, false, false, true, false, true, true, false],
    [true, true, false, true, false, false, true, true, true],
    [false, false, true, true, false, true, true, true, true]
  ];

  togglesCheckedValues = [
    false, false, false, false, false, false, false, false, false
  ];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  clickSlide(event: Event, toggleIndex: number) {
    event.preventDefault();
    for (let i = 0; i < this.toggleChangeArray[toggleIndex].length; i++) {
      if (this.toggleChangeArray[toggleIndex][i]) {
        this.togglesCheckedValues[i] = !this.togglesCheckedValues[i];
      }
    }
  }

  getNumCheckedToggles(): number {
    let num = 0;
    for (const checked of this.togglesCheckedValues) {
      if (checked) {
        num++;
      }
    }
    return num;
  }

  submit(): void {
    this.snackBar.open('Wow, you did it! You really are a human!');
  }
}
