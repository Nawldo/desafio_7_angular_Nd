import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Esta é a rota raiz para o Login
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home', // Rota para a Home
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard', // <<--- NOVA ROTA PARA O DASHBOARD
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  // OPCIONAL: Redireciona qualquer rota não encontrada para a raiz (login)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
