import React, { useState, useEffect } from 'react';
import { TrafficMap } from './components/TrafficMap';
import { DataAnalytics } from './components/DataAnalytics';
import { OptimizationPanel } from './components/OptimizationPanel';

// Simulated data generation
const generateData = () => ({
  congestionLevel: Math.floor(Math.random() * 100),
  pollutionIndex: Math.floor(Math.random() * 200),
});

const generateTimeSeriesData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(now.getTime() - i * 3600000),
    value: Math.floor(Math.random() * 100),
  }));
};

const mockRecommendations = [
  {
    id: 1,
    type: 'traffic' as const,
    message: 'Adjust signal timing at intersection A to reduce congestion',
    impact: 85,
  },
  {
    id: 2,
    type: 'pollution' as const,
    message: 'Redirect heavy vehicles to alternate route B',
    impact: 75,
  },
];

const App: React.FC = () => {
  const [trafficData, setTrafficData] = useState(generateData());
  const [historicalTraffic] = useState(generateTimeSeriesData());
  const [historicalPollution] = useState(generateTimeSeriesData());

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(generateData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleOptimizationApply = (id: number) => {
    console.log(`Applying optimization recommendation ${id}`);
    // In a real application, this would trigger actual optimization actions
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-indigo-900 text-center">
          Traffic & Pollution Optimization System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="transform hover:scale-102 transition-transform duration-200">
            <TrafficMap data={trafficData} />
          </div>
          <div className="transform hover:scale-102 transition-transform duration-200">
            <OptimizationPanel 
              recommendations={mockRecommendations}
              onApply={handleOptimizationApply}
            />
          </div>
        </div>
        
        <div className="mt-6 transform hover:scale-102 transition-transform duration-200">
          <DataAnalytics 
            trafficData={historicalTraffic}
            pollutionData={historicalPollution}
          />
        </div>
      </div>
    </div>
  );
};

export default App;