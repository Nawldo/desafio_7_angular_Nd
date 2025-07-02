import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Veiculo, VeiculosAPI } from 'src/app/models/veiculo.model';

@Component({ // <<--- ESSA SEÇÃO É VITAL! GARANTA QUE ELA ESTÁ AQUI.
  selector: 'app-dashboard',
  standalone: false, // Mantenha como false
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  searchModelControl = new FormControl('');
  selectedVehicle: Veiculo | null = null;
  totalSales: number | string = 0;
  connectedVehicles: number | string = 0;
  softwareUpdates: number | string = 0;
  vehicleImageUrl: string = 'https://via.placeholder.com/600x300?text=Selecione+um+Veiculo';

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.searchModelControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(modelName => {
        if (modelName) {
          return of({ vehicles: [{
            id: 1,
            vehicle: modelName as string,
            volumetotal: 12345,
            connected: 6789,
            softwareUpdates: 1234
          }]} as VeiculosAPI);
        } else {
          return of({ vehicles: [] } as VeiculosAPI);
        }
      })
    ).subscribe(data => {
      if (data.vehicles && data.vehicles.length > 0) {
        this.selectedVehicle = data.vehicles[0];
        this.updateVehicleDisplay(this.selectedVehicle);
      } else {
        this.selectedVehicle = null;
        this.resetVehicleDisplay();
      }
    });

    this.loadInitialMockData();
  }

  updateVehicleDisplay(vehicle: Veiculo): void {
    this.totalSales = vehicle.volumetotal;
    this.connectedVehicles = vehicle.connected;
    this.softwareUpdates = vehicle.softwareUpdates;
    this.vehicleImageUrl = `https://via.placeholder.com/600x300?text=${vehicle.vehicle.replace(/ /g, '+')}`;
  }

  resetVehicleDisplay(): void {
    this.totalSales = 0;
    this.connectedVehicles = 0;
    this.softwareUpdates = 0;
    this.vehicleImageUrl = 'https://via.placeholder.com/600x300?text=Selecione+um+Veiculo';
    this.selectedVehicle = null;
  }

  loadInitialMockData(): void {
    const mockVehicle: Veiculo = {
      id: 1,
      vehicle: 'Ford Fiesta',
      volumetotal: 150000,
      connected: 120000,
      softwareUpdates: 95000
    };
    this.selectedVehicle = mockVehicle;
    this.updateVehicleDisplay(mockVehicle);
  }
}
