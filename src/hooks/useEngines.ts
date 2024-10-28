import { useState, useEffect } from 'react';
import { Engine } from '../types';
import { fetchEngines, createEngine } from '../services/api';

export function useEngines() {
  const [engines, setEngines] = useState<Engine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEngines();
  }, []);

  async function loadEngines() {
    try {
      setLoading(true);
      const data = await fetchEngines();
      setEngines(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load engines');
    } finally {
      setLoading(false);
    }
  }

  async function addEngine(newEngine: Omit<Engine, 'id'>) {
    try {
      const created = await createEngine(newEngine);
      setEngines([...engines, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add engine');
      throw err;
    }
  }

  return { engines, loading, error, addEngine };
}