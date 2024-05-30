import React from 'react';

const NumberDisplay = ({ numbers, average }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
      <h2>Average: {average.toFixed(2)}</h2>
    </div>
  );
};

export default NumberDisplay;
