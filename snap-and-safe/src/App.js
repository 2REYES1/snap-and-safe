/* eslint-disable react/jsx-no-bind */
import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Components/Dashboard/Dashboard';
import Email from './Components/Email/Email';
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
            <Route
              path="/email"
              element={(
                <Email/>
              )}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
