// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { VehicleService } from '@shared/vehicle.service';
// Importe Veiculo e VehicleData do seu arquivo de modelo
import { Veiculo, VehicleData } from '@models/veiculo.model'; // Certifique-se que VehicleData está aqui

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchModelControl = new FormControl('');
  searchVinControl = new FormControl(''); // <-- ESTA LINHA PRECISA ESTAR AQUI

  selectedVehicle: Veiculo | null = null;
  vehicleDataDetails: VehicleData | null = null; // <-- ESTA LINHA PRECISA ESTAR AQUI

  totalSales: number | string = 0;
  connectedVehicles: number | string = 0;
  softwareUpdates: number | string = 0;
  vehicleImageUrl: string = 'assets/imagens/ford-nald.jpg'; // Caminho para sua imagem de placeholder

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    // Lógica para busca por modelo de veículo (já existente e funcionando)
    this.searchModelControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(modelName => {
        if (modelName && modelName.trim() !== '') {
          return this.vehicleService.getVehicles().pipe(
            map(vehicles => {
              const filteredVehicles = vehicles.filter((v: Veiculo) =>
                v.vehicle.toLowerCase().includes(modelName.toLowerCase())
              );
              return filteredVehicles.length > 0 ? filteredVehicles[0] : null;
            }),
            catchError(error => {
              console.error('Erro ao buscar veículos na API:', error);
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe(selectedVehicleResult => {
      if (selectedVehicleResult) {
        this.selectedVehicle = selectedVehicleResult;
        this.updateVehicleDisplay(this.selectedVehicle as Veiculo);
      } else {
        this.selectedVehicle = null;
        this.resetVehicleDisplay();
      }
    });

    // --- NOVA LÓGICA: Busca por VIN para a Tabela ---
    this.searchVinControl.valueChanges.pipe( // <-- ESTE BLOCO PRECISA ESTAR AQUI
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(vinCode => {
        if (vinCode && vinCode.trim() !== '') {
          return this.vehicleService.getVehicleDataByVin(vinCode as string).pipe(
            catchError(error => {
              console.error('Erro ao buscar dados do VIN na API:', error);
              this.vehicleDataDetails = null;
              return of(null);
            })
          );
        } else {
          this.vehicleDataDetails = null;
          return of(null);
        }
      })
    ).subscribe(vehicleDataResult => {
      if (vehicleDataResult) {
        this.vehicleDataDetails = vehicleDataResult;
      } else {
        this.vehicleDataDetails = null;
      }
    });
    // --- FIM DA NOVA LÓGICA ---
  }

  updateVehicleDisplay(vehicle: Veiculo): void {
    this.totalSales = vehicle.volumetotal;
    this.connectedVehicles = vehicle.connected;
    this.softwareUpdates = vehicle.softwareUpdates;
    this.vehicleImageUrl = vehicle.img;
  }

  resetVehicleDisplay(): void {
    this.totalSales = 0;
    this.connectedVehicles = 0;
    this.softwareUpdates = 0;
    this.vehicleImageUrl = 'assets/imagens/ford-nald.jpg';
    this.selectedVehicle = null;
    this.vehicleDataDetails = null; // <-- ESTA LINHA PRECISA ESTAR AQUI
  }

  loadInitialMockData(): void {
    const mockVehicle: Veiculo = {
      id: 1,
      vehicle: 'Ford Fiesta',
      volumetotal: 150000,
      connected: 120000,
      softwareUpdates: 95000,
      vin: 'MOCKVIN123456789',
      img: 'http://localhost:3000/fiesta.png'
    };
    this.selectedVehicle = mockVehicle;
    this.updateVehicleDisplay(mockVehicle);
  }
}
