import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from "./components/events/events.component";

const routes: Routes = [
  {path: 'events', component: EventsComponent},
  {
    path: 'register/:id/:title',
    loadComponent: () => import('./components/register-form/register-form.component').then(m => m.RegisterFormComponent)
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./components/view/view.component').then(m => m.ViewComponent)
  },
  {path: '', redirectTo: '/events', pathMatch: 'full'}, // Редирект за замовчуванням


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
