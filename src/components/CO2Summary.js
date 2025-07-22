import React, { useState } from 'react';

function CO2Summary({ data }) {
  const [showMore, setShowMore] = useState(false); // ✅ Hook at top

  if (!data || data.length === 0) return null;

  const co2Values = data.map(item => item.emissions || item.predicted_co2);
  const max = Math.max(...co2Values);
  const min = Math.min(...co2Values);

  let level = '';
  let description = '';
  let bg = '';

  if (max < 50) {
    level = '🟩 Low Emitter';
    bg = 'bg-green-100';
    description =
      'This country emits very low levels of CO₂. It may have low industrial activity, a small population, or rely heavily on renewable energy.';
  } else if (max < 300) {
    level = '🟨 Moderate Emitter';
    bg = 'bg-yellow-100';
    description =
      'This country emits a moderate amount of CO₂, likely from growing industries, urbanization, and transport.';
  } else if (max < 1000) {
    level = '🟧 High Emitter';
    bg = 'bg-orange-100';
    description =
      'This country has high CO₂ emissions due to industrialization, energy use, and economic activity.';
  } else {
    level = '🟥 Very High Emitter';
    bg = 'bg-red-100';
    description =
      'This country is one of the largest CO₂ emitters globally. Heavy fossil fuel use and industrial activity drive emissions significantly.';
  }

  return (
    <div className={`p-4 mt-6 rounded-lg shadow-md ${bg}`}>
      <h3 className="text-lg font-bold">{level}</h3>
      <p className="mt-1 text-sm text-gray-700">{description}</p>
      <p className="mt-2 text-xs text-gray-500">
        Based on a CO₂ range of {min.toFixed(2)} to {max.toFixed(2)} MtCO₂
      </p>

      <button
        className="mt-3 text-sm text-blue-600 hover:underline focus:outline-none"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? '🔽 Hide' : '▶️ Learn More'}
      </button>

      {showMore && (
        <div className="mt-3 text-sm text-gray-700">
          <p className="mb-2">
            <strong>MtCO₂</strong> stands for{' '}
            <em>Million Metric Tons of Carbon Dioxide</em> — a global unit for measuring how much CO₂ is released by countries or industries.
          </p>
          <p className="font-semibold">🌍 Why CO₂ Levels Matter:</p>
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Accelerates global warming and climate change</li>
            <li>Triggers extreme heatwaves, wildfires, and droughts</li>
            <li>Causes sea level rise and stronger hurricanes</li>
            <li>Contributes to air pollution and health issues</li>
            <li>Impacts agriculture, food supply, and water sources</li>
            <li>Affects marine life via ocean acidification</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CO2Summary;
