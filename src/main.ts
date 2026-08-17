import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(),
    importProvidersFrom(AppModule),
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(BrowserAnimationsModule)
  ]
})
  .catch(err => console.error(err));
