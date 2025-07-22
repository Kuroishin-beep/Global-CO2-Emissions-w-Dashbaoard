import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './components/Chart';
import CountrySelector from './components/CountrySelector';
import PredictionChart from './components/PredictionChart';
import CO2Summary from './components/CO2Summary';

const API_BASE = "http://127.0.0.1:8000"; // Central base URL

function App() {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("Philippines");
  const [data, setData] = useState([]);
  const [predicted, setPredicted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch country list once on mount
  useEffect(() => {
    axios.get(`${API_BASE}/countries`)
      .then(res => setCountries(res.data))
      .catch(err => setError("Failed to fetch countries"));
  }, []);

  // Fetch data + prediction when selected country changes
  useEffect(() => {
    if (!selected) return;

    const fetchCountryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dataRes, predRes] = await Promise.all([
          axios.get(`${API_BASE}/data/${selected}`),
          axios.get(`${API_BASE}/predict/${selected}`)
        ]);
        setData(dataRes.data);
        setPredicted(predRes.data);
      } catch (err) {
        setError("Failed to load country data");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [selected]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🌍 CO₂ Emissions Dashboard</h1>

      {error && <p className="text-red-600">{error}</p>}

      <CountrySelector
        countries={countries}
        selected={selected}
        setSelected={setSelected}
      />

      {loading ? (
        <p className="text-gray-600 mt-4">Loading data...</p>
      ) : (
        <>
          <Chart data={data} />
          <PredictionChart data={predicted} />
        </>
      )}
    </div>
  );
}

export default App;
