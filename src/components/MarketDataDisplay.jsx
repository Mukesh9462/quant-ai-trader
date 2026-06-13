import React from 'react';

const MarketDataDisplay = ({ symbol, currentPrice, historicalData }) => {
  return (
    <div>
      <h2>Market Data for {symbol}</h2>
      <p>Current Price: ${currentPrice}</p>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(historicalData).map((date, index) => (
            <tr key={index}>
              <td>{date}</td>
              <td>{historicalData[date]['1. open']}</td>
              <td>{historicalData[date]['2. high']}</td>
              <td>{historicalData[date]['3. low']}</td>
              <td>{historicalData[date]['4. close']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketDataDisplay;
