import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import MedicationGridComponent from './components/MedicationGridComponent';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/'/>
        <Route path='medications' element={<MedicationGridComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
