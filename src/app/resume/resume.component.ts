import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
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
