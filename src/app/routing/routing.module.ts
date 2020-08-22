import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import components here.

//import { PageNotFoundComponent } from '../components/page-not-found/page.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: '<your_path>' },
  //{ path: '<your_path>', component: <Your_Component> },
 //Keep it last { path: '**', component:PageNotFoundComponent  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}