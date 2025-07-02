import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component'; // Importe o HomeComponent

const routes: Routes = [
  {
    path: '', // Rota vazia DENTRO do HomeModule
    component: HomeComponent // Aponta para o HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
