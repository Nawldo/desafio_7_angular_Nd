// src/app/models/veiculo.model.ts

/**
 * @interface Veiculo
 * @description
 * Define a estrutura de um objeto Veículo conforme retornado pela API na rota '/vehicles'.
 * Esta interface foi ajustada para corresponder à estrutura de dados real da API,
 * incluindo as propriedades 'vin' e 'img', e tipagem numérica para 'id', 'volumetotal',
 * 'connected' e 'softwareUpdates', a fim de resolver erros de tipagem e permitir
 * a correta exibição dos dados no frontend Angular.
 */
export interface Veiculo {
  id: number;
  vehicle: string; // Nome do modelo do veículo (ex: "Ranger", "Mustang")
  volumetotal: number; // Total de vendas
  connected: number; // Veículos conectados
  softwareUpdates: number; // Veículos com software atualizado
  vin: string; // Número de Identificação do Veículo (Vehicle Identification Number)
  img: string; // URL da imagem do veículo (ex: "http://localhost:3000/ranger.png")
}

/**
 * @interface VehicleData
 * @description
 * Define a estrutura de um objeto de dados detalhados de veículo,
 * conforme retornado pela API na rota '/vehicleData'.
 * Ajuste os tipos conforme o retorno exato da API para /vehicleData se for diferente.
 */
export interface VehicleData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

// NOTA: As interfaces 'Veiculos extends Array<Veiculo>' e 'VeiculosAPI { vehicles: Veiculos; }'
// foram removidas ou não são utilizadas diretamente para o retorno da rota '/vehicles',
// pois a API retorna um array de Veiculo[] diretamente.
