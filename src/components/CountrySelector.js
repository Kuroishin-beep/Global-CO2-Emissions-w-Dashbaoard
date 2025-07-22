function CountrySelector({ countries, selected, setSelected }) {
    return (
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className="p-2 border rounded"
      >
        {countries.map(c => <option key={c}>{c}</option>)}
      </select>
    );
  }
  
  export default CountrySelector;
  