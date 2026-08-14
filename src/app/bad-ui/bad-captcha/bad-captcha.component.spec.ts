import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BadCaptchaComponent } from './bad-captcha.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BadCaptchaComponent', () => {
  let component: BadCaptchaComponent;
  let fixture: ComponentFixture<BadCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BadCaptchaComponent, MatSnackBarModule, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
