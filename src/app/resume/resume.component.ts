import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class ResumeComponent implements OnInit {

  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
}
