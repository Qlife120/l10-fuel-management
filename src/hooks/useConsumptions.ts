import { useState, useEffect } from 'react';
import { Consumption } from '../types';
import { 
  fetchConsumptions, 
  createConsumption, 
  fetchConsumptionsByEngine,
  fetchTotalConsumptionByMonth,
  fetchMaxConsumptionOfMonth,
  fetchConsumptionsByDateRange,
  fetchGraphConsumptions,
  fetchTotalConsumptionCurrentMonth
} from '../services/api';

export function useConsumptions() {
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonthTotal, setCurrentMonthTotal] = useState<number>(0);
  const [maxConsumption, setMaxConsumption] = useState<{ engine: string; amount: number } | null>(null);

  useEffect(() => {
    loadConsumptions();
    loadCurrentMonthData();
  }, []);

  async function loadConsumptions() {
    try {
      setLoading(true);
      const data = await fetchConsumptions();
      const transformed: Consumption[] = data.map(item => ({
        id: item.id,
        engineId: item.engine.matricule,
        amount: item.consumption,
        date: item.consumptionDate,
      }));
      setConsumptions(transformed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load consumptions');
    } finally {
      setLoading(false);
    }
  }

  async function loadCurrentMonthData() {
    try {
      const [totalMonth, maxCons] = await Promise.all([
        fetchTotalConsumptionCurrentMonth(),
        fetchMaxConsumptionOfMonth()
      ]);
      setCurrentMonthTotal(totalMonth);
      setMaxConsumption({
        engine: maxCons.first,
        amount: maxCons.second
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load current month data');
    }
  }

  async function addConsumption(newConsumption: Omit<Consumption, 'id'>) {
    try {
      const created = await createConsumption(newConsumption);
      const consumption: Consumption = {
        id: created.id,
        engineId: created.engine.matricule,
        amount: created.consumption,
        date: created.consumptionDate,
      };
      setConsumptions([...consumptions, consumption]);
      await loadCurrentMonthData(); // Refresh monthly stats
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add consumption');
      throw err;
    }
  }

  return { 
    consumptions, 
    loading, 
    error, 
    addConsumption,
    currentMonthTotal,
    maxConsumption
  };
}