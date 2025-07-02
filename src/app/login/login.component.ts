import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' // Ou 'styles: [...]' se você manteve inline
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router) { } // Injete o Router

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'admin' && password === '123456') {
        console.log('Login bem-sucedido! Redirecionando para a Home...');
        this.router.navigate(['/home']); // Redireciona para a rota '/home'
      } else {
        this.errorMessage = 'Usuário ou senha inválidos.';
      }
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos.';
    }
  }
}
