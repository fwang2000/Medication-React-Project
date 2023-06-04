import React, { useEffect, useState } from 'react';
import './App.css';

import 'ag-grid-community/styles/ag-grid.css';
import MedicationGridComponent from './components/MedicationGridComponent';

function App() {

  return (
    <div className="App">
      <h2 id="grid-header">Active Medication</h2>
      <MedicationGridComponent/>
    </div>
  );
}

export default App;
