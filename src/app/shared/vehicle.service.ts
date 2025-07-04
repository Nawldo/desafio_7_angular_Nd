// src/app/shared/vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Remova a importação de VeiculosAPI, pois ela não existe mais.
// Importe apenas Veiculo e VehicleData.
import { Veiculo, VehicleData } from '@models/veiculo.model'; // Use o alias @models

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000'; // URL base da sua API

  constructor(private http: HttpClient) { }

  /**
   * @method getVehicles
   * @description
   * Busca a lista completa de veículos da API.
   * A API retorna um array de objetos Veiculo diretamente na rota /vehicles (plural).
   */
  getVehicles(): Observable<Veiculo[]> {
    const url = `${this.apiUrl}/vehicles`; // Sua API usa /vehicles (plural)
    return this.http.get<Veiculo[]>(url); // Espera um array de Veiculo
  }

  /**
   * @method getVehicleDataByVin
   * @description
   * Busca dados detalhados de um veículo pelo seu VIN.
   * A API espera um POST para /vehicleData e o VIN no corpo da requisição.
   * @param vin O VIN (Vehicle Identification Number) do veículo.
   */
  getVehicleDataByVin(vin: string): Observable<VehicleData> { // Retorna um único VehicleData
    const url = `${this.apiUrl}/vehicleData`;
    // Sua API espera um POST com o VIN no corpo da requisição
    return this.http.post<VehicleData>(url, { vin: vin });
  }

  // O método searchVehiclesByModel não é mais necessário aqui,
  // pois a filtragem por nome do modelo é feita no DashboardComponent após
  // a chamada a getVehicles().
  // Se você precisar de uma busca específica no backend no futuro,
  // este seria o lugar para implementá-la.
}
