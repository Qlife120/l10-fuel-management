/**
 * Engine Endpoints
 */
export interface GetEnginesResponse extends Array<{
    id: string;
    matricule: string;
    name: string;
  }> {}
  
  export interface CreateEngineRequest {
    matricule: string;
    engineName: string;
  }
  
  export interface CreateEngineResponse {
    id: string;
    matricule: string;
    name: string;
  }
  
  /**
   * Consumption Endpoints
   */
  export interface GetConsumptionsResponse extends Array<{
    id: string;
    consumptionDate: string;
    consumption: number;
    engine: {
      matricule: string;
      engineName: string;
    };
  }> {}
  
  export interface CreateConsumptionRequest {
    matricule: string;
    consumption: number;
    consumptionDate: string;
  }
  
  export interface CreateConsumptionResponse {
    id: string;
    consumptionDate: string;
    consumption: number;
    engine: {
      matricule: string;
      engineName: string;
    };
  }
  
  export interface GetConsumptionsByEngineResponse extends Array<{
    id: string;
    consumptionDate: string;
    consumption: number;
    engine: {
      matricule: string;
      engineName: string;
    };
  }> {}
  
  export interface GetTotalConsumptionByMonthResponse {
    total: number;
  }
  
  export interface GetMaxConsumptionResponse {
    first: string;  // Engine matricule
    second: number; // Consumption amount
  }
  
  export interface GetTotalConsumptionResponse {
    total: number;
  }
  
  export interface GetGraphConsumptionsResponse {
    [date: string]: number;
  }
  
  /**
   * API Endpoints Configuration
   */
  export interface ApiEndpoints {
    // Engine endpoints
    GET_ENGINES: '/api/engine/engines';
    CREATE_ENGINE: '/api/engine/newengine';
    
    // Consumption endpoints
    GET_CONSUMPTIONS: '/api/consumption/allconsumptions';
    CREATE_CONSUMPTION: '/api/consumption/newconsumption';
    GET_CONSUMPTIONS_BY_ENGINE: '/api/consumption/consumptions';
    GET_TOTAL_CONSUMPTION_BY_MONTH: '/api/consumption/totalconsumptionbymonth';
    GET_MAX_CONSUMPTION: '/api/consumption/maxtotalconsumption';
    GET_TOTAL_CONSUMPTION_DATES: '/api/consumption/totalconsumptiondates';
    GET_GRAPH_CONSUMPTIONS: '/api/consumption/graphconsumptions';
    GET_TOTAL_CONSUMPTION_CURRENT_MONTH: '/api/consumption/totalconsumptionmonth';
  }
  
  /**
   * API Error Response
   */
  export interface ApiErrorResponse {
    message: string;
    status: number;
    timestamp?: string;
  }