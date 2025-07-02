import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { Observable } from 'rxjs'; // Importe Observable
// Importe as interfaces de veículos que você me forneceu
import { Veiculo, VeiculosAPI } from 'src/app/models/veiculo.model';

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class VehicleService {
  private API_BASE_URL = 'http://localhost:3000'; // URL base da sua API backend

  constructor(private http: HttpClient) { } // Injete o HttpClient

  /**
   * Busca todos os veículos ou filtra por modelo (simulado por enquanto).
   * Em uma API real, o filtro seria feito no backend.
   */
  getVehicles(modelName?: string): Observable<VeiculosAPI> {
    const url = `${this.API_BASE_URL}/vehicle`; // Endpoint para buscar veículos
    // Se a API suportasse filtros: const url = `${this.API_BASE_URL}/vehicle?model=${modelName}`;

    // Retorna um Observable do tipo VeiculosAPI
    return this.http.get<VeiculosAPI>(url);
  }

  /**
   * Busca dados detalhados de um veículo por código (simulado por enquanto).
   */
  getVehicleData(code: string): Observable<any> { // Ajuste 'any' para uma interface mais específica se tiver
    const url = `${this.API_BASE_URL}/vehicleData`; // Endpoint para buscar dados detalhados
    // Se a API suportasse filtros: const url = `${this.API_BASE_URL}/vehicleData?code=${code}`;

    return this.http.get<any>(url); // Retorna um Observable de dados do veículo
  }
}
