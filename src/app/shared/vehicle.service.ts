    // src/app/shared/vehicle.service.ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    // ATENÇÃO: Mudei o caminho para usar o alias definido em tsconfig.json
    import { VeiculosAPI, Veiculo } from '@models/veiculo.model'; // Use o alias @models

    @Injectable({
      providedIn: 'root'
    })
    export class VehicleService {
      private apiUrl = 'http://localhost:3000';

      constructor(private http: HttpClient) { }

      getVehicles(modelName?: string): Observable<VeiculosAPI> {
        const url = `${this.apiUrl}/vehicle`;
        return this.http.get<VeiculosAPI>(url);
      }

      getVehicleData(code: string): Observable<any> {
        const url = `${this.apiUrl}/vehicleData`;
        return this.http.get<any>(url);
      }

      searchVehiclesByModel(modelName: string): Observable<VeiculosAPI> {
        return this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicle`);
      }
    }
    