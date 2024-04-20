/* eslint-disable react/jsx-no-bind */
import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Components/Dashboard/Dashboard';
import FoodCheck from './Components/FoodCheck/FoodCheck';
import PillCheck from './Components/PillCheck/PillCheck';

function App() {
  const [currentRoute, setCurrentRoute] = React.useState('/');

  function handleCurrentRoute(route) {
    setCurrentRoute(route);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard />
              }
            />
            <Route
              path="/pillCheck"
              element={(
                <PillCheck
                />
              )}
            />
            <Route
              path="/foodCheck"
              element={(
                <FoodCheck/>
              )}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
