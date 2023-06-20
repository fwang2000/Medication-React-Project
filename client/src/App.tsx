import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import MedicationGridComponent from './components/Grids/MedicationGridComponent';
import UpdateMedicationForm from './components/Forms/UpdateMedicationForm';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/'/>
        <Route path='medications/' element={<MedicationGridComponent/>}></Route>
        <Route path='medications/update/:index' element={<UpdateMedicationForm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
