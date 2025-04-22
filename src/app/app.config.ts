import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http'; // ✅ Pour activer HttpClient

import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { InvoiceService } from './invoice/create-invoice/invoice.service'; // ✅ Ton service
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog'; // Importer MatDialogModule
import { MatButtonModule } from '@angular/material/button';
import { ModifyInvoiceComponent } from './modify-invoice/modify-invoice.component';

export const appConfig: ApplicationConfig = {

  providers: [
    InvoiceService,
    ListInvoicesComponent,// ✅ VIRGULE ICI !
    ModifyInvoiceComponent,
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    provideHttpClient(), // ✅ Active le HttpClient dans tes services
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimationsAsync()
  ]
};
