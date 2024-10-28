import { BarChart3, Truck, Fuel } from 'lucide-react';

interface DashboardProps {
  totalEngines: number;
  totalConsumption: number;
}

export function Dashboard({ totalEngines, totalConsumption }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Truck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Engines</p>
            <p className="text-2xl font-semibold">{totalEngines}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <Fuel className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Consumption</p>
            <p className="text-2xl font-semibold">{totalConsumption}L</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Consumption</p>
            <p className="text-2xl font-semibold">
              {totalEngines ? (totalConsumption / totalEngines).toFixed(1) : 0}L
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}