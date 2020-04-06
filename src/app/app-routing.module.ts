import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from '../app/views/pages/people/people.component';
import { ErrorComponent } from '../app/views/pages/error/error.component';

const routes: Routes = [
  { path: 'people', component: PeopleComponent},
  { path: '', redirectTo: '/people', pathMatch: 'full'},
  { path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
