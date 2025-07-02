import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importe o Router para navegação

@Component({
  selector: 'app-home',
  standalone: false, // Mantenha como false
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' // O Angular vai procurar por home.component.css
})
export class HomeComponent {

  // Injete o Router no construtor
  constructor(private router: Router) { }

  logout(): void {
    console.log('Usuário deslogado. Redirecionando para a tela de login...');
    // Em uma aplicação real, aqui você limparia tokens de autenticação (ex: localStorage)
    this.router.navigate(['/']); // Redireciona para a rota raiz (login)
  }
}
