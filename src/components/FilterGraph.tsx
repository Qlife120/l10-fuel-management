import { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Consumption, Engine } from '../types';
import { Fuel } from 'lucide-react'; // Replace with your actual icon import

interface FilterGraphProps {
  consumptions: Consumption[];
  engines: Engine[];
}

export function FilterGraph({ consumptions, engines }: FilterGraphProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedMatricule, setSelectedMatricule] = useState<string | null>(null);

  // Filtered consumptions based on selected engine and date range
  const filteredData = useMemo(() => {
    return consumptions
      .filter((consumption) => {
        const engineMatch = selectedMatricule ? consumption.engineId === selectedMatricule : true;

        const date = new Date(consumption.date);
        const startMatch = startDate ? date >= startDate : true;
        const endMatch = endDate ? date <= endDate : true;

        return engineMatch && startMatch && endMatch;
      })
      .map((consumption) => ({
        date: consumption.date,
        amount: consumption.amount,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [consumptions, selectedMatricule, startDate, endDate]);

  // Calculate total consumption for the selected period and engine
  const totalConsumption = useMemo(() => {
    return filteredData.reduce((sum, consumption) => sum + consumption.amount, 0);
  }, [filteredData]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
      <h1 className="text-xl font-semibold mb-6">Filtered Search</h1>
      
      {/* Filter Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={selectedMatricule || ''}
          onChange={(e) => setSelectedMatricule(e.target.value || null)}
          className="border rounded-md p-2 w-full"
        >
          <option value="">Select Engine Matricule</option>
          {engines.map((engine) => (
            <option key={engine.id} value={engine.id}>
              {engine.matricule}
            </option>
          ))}
        </select>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          dateFormat="dd/MM/yyyy"
          className="border rounded-md p-2 w-full"
          isClearable
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          dateFormat="dd/MM/yyyy"
          className="border rounded-md p-2 w-full"
          isClearable
        />
      </div>

      {/* Chart and Total Consumption Card Section */}
      <div className="flex gap-4">
        {/* Total Consumption Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col justify-center items-center w-1/6">
          <div className="p-3 bg-green-50 rounded-lg mb-2">
            <Fuel className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Total Consumption</p>
          <p className="text-2xl font-semibold">{totalConsumption.toFixed(1)}L</p>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 w-5/6">
          <h2 className="text-lg font-semibold mb-4">Engine Consumption Over Time</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  }
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{
                    value: 'Liters',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' },
                  }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(1)}L`, 'Consumption']}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  }
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Consumption"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
