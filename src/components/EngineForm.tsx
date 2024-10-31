import { useState } from 'react';
import { Engine } from '../types';
import {  CheckCircle, Info } from 'lucide-react';

interface EngineFormProps {
  engines: Engine[];
  onSubmit: (engine: Omit<Engine, 'id'>) => void;
}

export function EngineForm({ engines, onSubmit }: EngineFormProps) {
  const [matricule, setMatricule] = useState('');
  const [name, setName] = useState('');

  const [alertSeverity, setAlertSeverity] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the amount is null, negative, or not a number
    if (engines.some(engine => engine.matricule === matricule)) {
      setAlertSeverity("danger");
      setTimeout(() => setAlertSeverity(null), 2500);
      return; // Prevent form submission
    }

    onSubmit({ matricule, name });

    setAlertSeverity("success");
    setTimeout(() => setAlertSeverity(null), 1500);

    setMatricule('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Add New Engine</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">
            Matricule
          </label>
          <input
            type="text"
            id="matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Engine Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Engine
        </button>

        {alertSeverity === 'success' && (
            <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
              <CheckCircle/>An example success alert with an icon
            </div>
          )}
          {alertSeverity === 'danger' && (
            <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
              <Info/>An example danger alert with an icon
            </div>
          )}

      </div>
    </form>
  );
}