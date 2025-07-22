import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import CO2Summary from './CO2Summary';

function PredictionChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">📈 Emission Predictions (2025–2050)</h2>
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="year" />
        <YAxis label={{ value: 'MtCO₂', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="predicted_co2"
          stroke="#82ca9d"
          strokeWidth={3}
        />
      </LineChart>

      {/* CO2 Summary + Learn More */}
      <CO2Summary data={data} />
    </div>
  );
}

export default PredictionChart;
