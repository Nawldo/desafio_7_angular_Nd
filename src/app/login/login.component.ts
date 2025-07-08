// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // Importe o AuthService

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false) // AQUI: Adicionamos o novo FormControl para o checkbox
    });

    // Opcional: Se o usuário marcou "Logar automaticamente" antes,
    // você pode carregar as credenciais salvas aqui.
    // Por exemplo, do localStorage:
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      this.loginForm.get('username')?.setValue(savedUsername);
      this.loginForm.get('rememberMe')?.setValue(true);
      // Nota: Não é seguro salvar a senha no localStorage.
      // Em um cenário real, você salvaria um token de refresh ou similar.
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value; // AQUI: Obtenha o valor de rememberMe

      this.authService.login(username, password).subscribe(
        user => {
          if (user) {
            // Login bem-sucedido
            console.log('Login bem-sucedido! Redirecionando para a Home...');

            // AQUI: Lógica para "Logar Automaticamente"
            if (rememberMe) {
              localStorage.setItem('rememberedUsername', username);
              // Em um cenário real, você poderia salvar um token de refresh aqui
              // para manter o usuário logado por mais tempo sem precisar de senha.
              // Por questões de segurança, evite salvar a senha diretamente.
            } else {
              localStorage.removeItem('rememberedUsername');
            }

            this.router.navigate(['/home']);
          } else {
            // Login falhou (AuthService já tratou o erro e retornou null)
            this.errorMessage = 'Usuário ou senha inválidos.';
          }
        },
        error => {
          console.error('Erro de comunicação ao tentar login:', error);
          this.errorMessage = 'Falha na comunicação com o servidor de autenticação.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos.';
    }
  }
}
