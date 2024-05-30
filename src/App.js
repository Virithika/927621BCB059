import React, { useState, useEffect, useCallback } from 'react';
import NumberDisplay from './NumberDisplay';
import './App.css';

const API_URL = 'http://20.244.56.144/numbers'; // Replace with your actual API URL

const App = () => {
  const [numberId, setNumberId] = useState('p');
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [error, setError] = useState(null);

  const fetchNumbers = useCallback(async () => {
    try {
      if (Math.random() < 0.1) { // Simulating API unavailability
        throw new Error('Simulated API unavailability');
      }

      const response = await fetch(`${API_URL}/${numberId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNumbers(data.windowCurrState);
      setAverage(data.avg);
      setError(null);
    } catch (error) {
      console.error('Error fetching numbers:', error);
      if (error.message === 'Simulated API unavailability') {
        setError('The API is currently unavailable. Please try again later.');
      } else if (error.message.includes('status: 503')) {
        setError('The server is temporarily unavailable. Please try again later.');
      } else {
        setError('Failed to fetch numbers from the server. Please try again later.');
      }
      setNumbers([]);
      setAverage(0);
    }
  }, [numberId]);

  useEffect(() => {
    fetchNumbers();
  }, [fetchNumbers]);

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <div>
        <label htmlFor="numberId">Choose number type:</label>
        <select
          id="numberId"
          value={numberId}
          onChange={(e) => setNumberId(e.target.value)}
        >
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      <NumberDisplay numbers={numbers} average={average} />
      <footer>© 2024 Average Calculator. All rights reserved.</footer>
    </div>
  );
};

export default App;
