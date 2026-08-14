import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BadTermsAndConditionsComponent } from './bad-terms-and-conditions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BadTermsAndConditionsComponent', () => {
  let component: BadTermsAndConditionsComponent;
  let fixture: ComponentFixture<BadTermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BadTermsAndConditionsComponent, MatSnackBarModule, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
