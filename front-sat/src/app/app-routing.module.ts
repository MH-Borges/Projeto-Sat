import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { AddComponent } from './components/add-base/add.component';


const routes: Routes = [
  { path: '', redirectTo: 'Index', pathMatch: 'full' },
  { path: 'Index', component: ListComponent },
  { path: 'Index/:id', component: DetailsComponent },
  { path: 'add', component: AddComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
