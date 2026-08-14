import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BadUiComponent } from './bad-ui.component';

describe('BadUiComponent', () => {
  let component: BadUiComponent;
  let fixture: ComponentFixture<BadUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BadUiComponent, NoopAnimationsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
