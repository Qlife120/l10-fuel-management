import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Consumption, Engine } from '../types';

interface ConsumptionGraphsProps {
  consumptions: Consumption[];
  engines: Engine[];
}

export function ConsumptionGraphs({ consumptions, engines }: ConsumptionGraphsProps) {
  const monthlyData = useMemo(() => {
    const data = new Map<string, number>();
    
    consumptions.forEach((consumption) => {
      const date = new Date(consumption.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const currentAmount = data.get(monthKey) || 0;
      data.set(monthKey, currentAmount + consumption.amount);
    });

    return Array.from(data.entries())
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [consumptions]);

  const engineData = useMemo(() => {
    const data = new Map<string, number>();
    
    consumptions.forEach((consumption) => {
      const engine = engines.find(e => e.matricule === consumption.engineId);
      if (engine) {
        const currentAmount = data.get(engine.matricule) || 0;
        data.set(engine.matricule, currentAmount + consumption.amount);
      }
    });

    return Array.from(data.entries())
      .map(([matricule, total]) => ({
        matricule,
        name: engines.find(e => e.id === matricule)?.name || 'Unknown',
        total,
      }))
      .sort((a, b) => b.total - a.total);
  }, [consumptions, engines]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Monthly Consumption Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const [year, month] = value.split('-');
                  return `${month}/${year.slice(2)}`;
                }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ 
                  value: 'Liters', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}L`, 'Consumption']}
                labelFormatter={(label) => {
                  const [year, month] = label.split('-');
                  return `${month}/${year}`;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="Consumption"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Consumption by Engine</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="matricule" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ 
                  value: 'Liters', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}L`, 'Total Consumption']}
                labelFormatter={(matricule) => {
                  const engine = engines.find(e => e.id === matricule);
                  return engine ? `${engine.matricule} - ${engine.name}` : matricule;
                }}
              />
              <Legend />
              <Bar
                dataKey="total"
                name="Total Consumption"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}