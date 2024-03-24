import React from 'react';
import { BrowserRouter as Router , Route, Routes,Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
     <Routes>
      <Route path="/" element={<Navigate to="/weather/london/uk" />} />
        
        {/* Route for Dashboard */}
        <Route path="/weather/:City/:Country" element={<Dashboard />} />
        </Routes>
    </Router>
 
  );
}

export default App;
