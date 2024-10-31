import { Engine, Consumption } from '../types';
import { Dashboard } from '../components/Dashboard';
import { EngineForm } from '../components/EngineForm';
import { ConsumptionForm } from '../components/ConsumptionForm';

interface HomePageProps {
  engines: Engine[];
  consumptions: Consumption[];
  currentMonthTotal: number;
  maxConsumption: { engine: string; amount: number } | null;
  onAddEngine: (engine: Omit<Engine, 'id'>) => void;
  onAddConsumption: (consumption: Omit<Consumption, 'id'>) => void;
}

export function HomePage({
  engines,
  consumptions,
  currentMonthTotal,
  maxConsumption,
  onAddEngine,
  onAddConsumption
}: HomePageProps) {
  const totalConsumption = consumptions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Dashboard
        totalEngines={engines.length}
        totalConsumption={totalConsumption}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <EngineForm engines={engines} onSubmit={onAddEngine} />
        <ConsumptionForm engines={engines} onSubmit={onAddConsumption} />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Recent Consumptions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (L)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {consumptions.map((consumption) => {
                const engine = engines.find((e) => e.id === consumption.engineId);
                return (
                  <tr key={consumption.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {engine ? `${engine.matricule} - ${engine.name}` : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {consumption.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(consumption.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {consumption.notes || '-'}
                    </td>
                  </tr>
                )}
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}