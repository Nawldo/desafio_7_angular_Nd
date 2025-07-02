import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component'; // Importe o LoginComponent

const routes: Routes = [
  {
    path: '', // Rota vazia DENTRO do LoginModule
    component: LoginComponent // Aponta para o LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
