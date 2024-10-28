export interface Engine {
    id: string;
    matricule: string;
    name: string;
  }
  
  export interface Consumption {
    id: string;
    engineId: string;
    amount: number;
    date: string;
    notes?: string;
  }
  
  export interface ConsumptionResponse {
    id: string;
    consumptionDate: string;
    consumption: number;
    engine: {
      matricule: string;
      engineName: string;
    };
  }