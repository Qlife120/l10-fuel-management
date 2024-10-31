import { Engine, Consumption } from '../types';
import { ConsumptionGraphs } from '../components/ConsumptionGraphs';
import { FilterGraph } from '../components/FilterGraph';

interface GraphsPageProps {
  engines: Engine[];
  consumptions: Consumption[];
}

export function GraphsPage({ engines, consumptions }: GraphsPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Fuel Consumption Analytics</h2>
        <p className="mt-2 text-gray-600">
          Analyze fuel consumption trends and patterns across engines and time periods.
        </p>
      </div>
      <FilterGraph
              engines={engines}
              consumptions={consumptions}
            />
      <ConsumptionGraphs
        engines={engines}
        consumptions={consumptions}
      />
      
    </main>
  );
}