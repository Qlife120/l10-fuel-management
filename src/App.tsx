import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { GraphsPage } from './pages/GraphsPage';
import { useEngines } from './hooks/useEngines';
import { useConsumptions } from './hooks/useConsumptions';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { engines, loading: enginesLoading, error: enginesError, addEngine } = useEngines();
  const { 
    consumptions, 
    loading: consumptionsLoading, 
    error: consumptionsError, 
    addConsumption,
    currentMonthTotal,
    maxConsumption
  } = useConsumptions();

  if (enginesLoading || consumptionsLoading) {
    return <LoadingSpinner />;
  }

  if (enginesError || consumptionsError) {
    return <ErrorMessage message={enginesError || consumptionsError || 'An error occurred'} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              engines={engines}
              consumptions={consumptions}
              currentMonthTotal={currentMonthTotal}
              maxConsumption={maxConsumption}
              onAddEngine={addEngine}
              onAddConsumption={addConsumption}
            />
          } 
        />
        <Route 
          path="/graphs" 
          element={
            <GraphsPage 
              engines={engines}
              consumptions={consumptions}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;