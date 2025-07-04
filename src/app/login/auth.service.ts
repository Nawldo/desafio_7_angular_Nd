// src/app/login/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe HttpClient
import { Observable, of } from 'rxjs'; // Importe Observable e of
import { tap, catchError } from 'rxjs/operators'; // Importe tap e catchError
import { Router } from '@angular/router'; // Importe Router

// Importe a interface Usuario que definimos (se estiver em models/usuario.model.ts)
import { Usuario } from '@models/usuario.model'; // Ajuste o caminho se for diferente

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL base da sua API
  private isAuthenticated = false; // Estado de autenticação

  constructor(private http: HttpClient, private router: Router) { }

  // Método para fazer a requisição de login
  login(username: string, password: string): Observable<Usuario | null> {
    const url = `${this.apiUrl}/login`;
    // Sua API espera 'nome' e 'senha' no corpo da requisição POST
    return this.http.post<Usuario>(url, { nome: username, senha: password }).pipe(
      tap((user: Usuario) => {
        // Se o login for bem-sucedido, salve o estado de autenticação
        this.isAuthenticated = true;
        // Opcional: Salvar informações do usuário ou token no localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('Login bem-sucedido no serviço!', user);
      }),
      catchError(error => {
        console.error('Erro de login no serviço:', error);
        this.isAuthenticated = false;
        // Retorna um Observable de null para indicar falha no login
        return of(null);
      })
    );
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    // Pode verificar o estado interno ou a existência de um token no localStorage
    return this.isAuthenticated || !!localStorage.getItem('currentUser');
  }

  // Método para deslogar o usuário
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser'); // Limpa qualquer informação de usuário
    this.router.navigate(['/']); // Redireciona para a tela de login
    console.log('Usuário deslogado no serviço.');
  }
}
