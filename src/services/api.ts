import { Engine, Consumption } from '../types';
import {
  ApiEndpoints,
  GetEnginesResponse,
  CreateEngineRequest,
  CreateEngineResponse,
  GetConsumptionsResponse,
  CreateConsumptionRequest,
  CreateConsumptionResponse,
  GetConsumptionsByEngineResponse,
  GetTotalConsumptionByMonthResponse,
  GetMaxConsumptionResponse,
  GetGraphConsumptionsResponse,
  GetTotalConsumptionResponse,
  ApiErrorResponse
} from './api.types';

const API_URL = 'http://localhost:8080';

const ENDPOINTS: ApiEndpoints = {
  GET_ENGINES: '/api/engine/engines',
  CREATE_ENGINE: '/api/engine/newengine',
  GET_CONSUMPTIONS: '/api/consumption/allconsumptions',
  CREATE_CONSUMPTION: '/api/consumption/newconsumption',
  GET_CONSUMPTIONS_BY_ENGINE: '/api/consumption/consumptions',
  GET_TOTAL_CONSUMPTION_BY_MONTH: '/api/consumption/totalconsumptionbymonth',
  GET_MAX_CONSUMPTION: '/api/consumption/maxtotalconsumption',
  GET_TOTAL_CONSUMPTION_DATES: '/api/consumption/totalconsumptiondates',
  GET_GRAPH_CONSUMPTIONS: '/api/consumption/graphconsumptions',
  GET_TOTAL_CONSUMPTION_CURRENT_MONTH: '/api/consumption/totalconsumptionmonth'
};

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiErrorResponse = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

// GET

export async function fetchEngines(): Promise<Engine[]> {
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_ENGINES}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<GetEnginesResponse>(response);
}

// POST 
export async function createEngine(engine: Omit<Engine, 'id'>): Promise<Engine> {
  const params = new URLSearchParams({
    matricule: engine.matricule,
    engineName: engine.name
  });
  
  const response = await fetch(`${API_URL}${ENDPOINTS.CREATE_ENGINE}?${params}`, {
    method: 'POST',
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<CreateEngineResponse>(response);
}

export async function fetchConsumptions(): Promise<GetConsumptionsResponse> {
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_CONSUMPTIONS}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<GetConsumptionsResponse>(response);
}

export async function createConsumption(consumption: Omit<Consumption, 'id'>): Promise<CreateConsumptionResponse> {
  const params = new URLSearchParams({
    matricule: consumption.engineId,
    consumption: consumption.amount.toString(),
    consumptionDate: new Date(consumption.date).toISOString().split('T')[0]
  });

  const response = await fetch(`${API_URL}${ENDPOINTS.CREATE_CONSUMPTION}?${params}`, {
    method: 'POST',
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<CreateConsumptionResponse>(response);
}

export async function fetchConsumptionsByEngine(matricule: string): Promise<GetConsumptionsByEngineResponse> {
  const params = new URLSearchParams({ matricule });
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_CONSUMPTIONS_BY_ENGINE}?${params}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<GetConsumptionsByEngineResponse>(response);
}

export async function fetchTotalConsumptionByMonth(month: number): Promise<number> {
  const params = new URLSearchParams({ month: month.toString() });
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_TOTAL_CONSUMPTION_BY_MONTH}?${params}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  const data = await handleResponse<GetTotalConsumptionByMonthResponse>(response);
  return data.total;
}

export async function fetchMaxConsumptionOfMonth(): Promise<GetMaxConsumptionResponse> {
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_MAX_CONSUMPTION}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<GetMaxConsumptionResponse>(response);
}

export async function fetchConsumptionsByDateRange(
  matricule: string,
  startDate: Date,
  endDate: Date
): Promise<GetTotalConsumptionResponse> {
  const params = new URLSearchParams({
    matricule,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  });
  
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_TOTAL_CONSUMPTION_DATES}?${params}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<GetTotalConsumptionResponse>(response);
}

export async function fetchGraphConsumptions(
  matricule: string,
  startDate: Date,
  endDate: Date
): Promise<GetGraphConsumptionsResponse> {
  const params = new URLSearchParams({
    matricule,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  });
  
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_GRAPH_CONSUMPTIONS}?${params}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  return handleResponse<GetGraphConsumptionsResponse>(response);
}

export async function fetchTotalConsumptionCurrentMonth(): Promise<number> {
  const response = await fetch(`${API_URL}${ENDPOINTS.GET_TOTAL_CONSUMPTION_CURRENT_MONTH}`, {
    headers: defaultHeaders,
    credentials: 'include'
  });
  const data = await handleResponse<GetTotalConsumptionResponse>(response);
  return data.total;
}