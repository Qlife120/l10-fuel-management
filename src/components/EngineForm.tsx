import { useState } from 'react';
import { Engine } from '../types';

interface EngineFormProps {
  onSubmit: (engine: Omit<Engine, 'id'>) => void;
}

export function EngineForm({ onSubmit }: EngineFormProps) {
  const [matricule, setMatricule] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ matricule, name });
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
      </div>
    </form>
  );
}