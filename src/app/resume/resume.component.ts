import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss'],
    standalone: false
})
export class ResumeComponent implements OnInit {

  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
}
