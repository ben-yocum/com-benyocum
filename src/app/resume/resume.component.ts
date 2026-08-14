import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule
]
})
export class ResumeComponent implements OnInit {

  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
}
