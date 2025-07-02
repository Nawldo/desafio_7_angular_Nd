import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component'; // Importe o DashboardComponent

const routes: Routes = [
  {
    path: '', // Rota vazia DENTRO do DashboardModule
    component: DashboardComponent // Aponta para o DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
