import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MainPageComponent } from './main-page/main-page.component';

export const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'form', component: FormComponent },
];
