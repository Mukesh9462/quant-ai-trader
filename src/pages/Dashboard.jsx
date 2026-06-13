import React from 'react';
import { Button, InputField } from '../components';

const Dashboard = () => {
  const [symbol, setSymbol] = React.useState('AAPL');
  const [currentPrice, setCurrentPrice] = React.useState(null);
  const [historicalData, setHistoricalData] = React.useState([]);

  const loadCurrentPrice = async () => {
    try {
      const res = await fetch(`/api/market/current_price/${symbol}`);
      const data = await res.json();
      setCurrentPrice(data.price);
    } catch (error) {
      console.error('CURRENT PRICE ERROR:', error);
    }
  };

  const loadHistoricalData = async () => {
    try {
      const res = await fetch(`/api/market/historical_data/${symbol}`);
      const data = await res.json();
      setHistoricalData(data.data);
    } catch (error) {
      console.error('HISTORICAL DATA ERROR:', error);
    }
  };

  React.useEffect(() => {
    loadCurrentPrice();
    loadHistoricalData();
  }, [symbol]);

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <InputField label="Search" name="search" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <Button onClick={loadCurrentPrice}>Load Current Price</Button>
      <Button onClick={loadHistoricalData}>Load Historical Data</Button>
      {currentPrice && <p>Current Price: ${currentPrice}</p>}
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

export default Dashboard;
