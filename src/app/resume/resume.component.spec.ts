import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct iframe source', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const iframe = compiled.querySelector('iframe');
    expect(iframe?.src).toContain('assets/Benjamin%20Yocum%20Resume%202026%20Revised.pdf');
  });
});
