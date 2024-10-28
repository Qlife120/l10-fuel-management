import { useState } from 'react';
import { Engine, Consumption } from '../types';

interface ConsumptionFormProps {
  engines: Engine[];
  onSubmit: (consumption: Omit<Consumption, 'id'>) => void;
}

export function ConsumptionForm({ engines, onSubmit }: ConsumptionFormProps) {
  const [engineId, setEngineId] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      engineId,
      amount: Number(amount),
      date: new Date().toISOString(),
      notes,
    });
    setEngineId('');
    setAmount('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Add Consumption</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="engine" className="block text-sm font-medium text-gray-700">
            Select Engine
          </label>
          <select
            id="engine"
            value={engineId}
            onChange={(e) => setEngineId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select an engine</option>
            {engines.map((engine) => (
              <option key={engine.id} value={engine.id}>
                {engine.matricule}  {engine.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Consumption Amount (L)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Add Consumption
        </button>
      </div>
    </form>
  );
}