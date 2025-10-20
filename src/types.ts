export interface Estacao {
    id: number;
    nome: string;
    lat: number;
    lng: number;
  }
  
  export interface RotaRequest {
    origemId: number;
    destinoId: number;
  }