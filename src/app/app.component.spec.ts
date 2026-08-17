import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        NoopAnimationsModule
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'com-benyocum'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('com-benyocum');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Benjamin Yocum');
  });

  it('should render desktop navigation buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navButtons = compiled.querySelectorAll('.toolbar-nav-links button');
    expect(navButtons.length).toBe(3);
    const buttonTexts = Array.from(navButtons).map(b => b.textContent?.trim());
    expect(buttonTexts).toEqual(['About', 'Resume', 'Bad UI']);
  });

  it('should render hamburger menu button with menu icon', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const hamburgerBtn = compiled.querySelector('.toolbar-hamburger-button') as HTMLButtonElement;
    expect(hamburgerBtn).toBeTruthy();
    expect(hamburgerBtn.querySelector('mat-icon')?.textContent?.trim()).toBe('menu');
  });

  it('should open hamburger menu with navigation items and Source Code link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const hamburgerBtn = compiled.querySelector('.toolbar-hamburger-button') as HTMLButtonElement;
    hamburgerBtn.click();
    fixture.detectChanges();

    const menuItems = document.querySelectorAll('.mat-mdc-menu-item, .mat-menu-item');
    expect(menuItems.length).toBe(4);
    const menuTexts = Array.from(menuItems).map(item => item.textContent?.trim());
    expect(menuTexts).toContain('About');
    expect(menuTexts).toContain('Resume');
    expect(menuTexts).toContain('Bad UI');
    expect(menuTexts).toContain('Source Code');

    const sourceCodeLink = document.querySelector('.source-code-link') as HTMLAnchorElement;
    expect(sourceCodeLink).toBeTruthy();
    expect(sourceCodeLink.href).toBe('https://github.com/ben-yocum/com-benyocum');
  });

  it('should render GitHub ribbon link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const ribbonLink = compiled.querySelector('.github-ribbon a') as HTMLAnchorElement;
    expect(ribbonLink).toBeTruthy();
    expect(ribbonLink.textContent?.trim()).toBe('Fork me on GitHub');
    expect(ribbonLink.href).toBe('https://github.com/ben-yocum/com-benyocum');
  });
});
