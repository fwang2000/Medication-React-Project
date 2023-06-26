import './App.css';
import { Route, Routes } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import MedicationGridComponent from './components/Grids/MedicationGridComponent';
import UpdateMedicationForm from './components/Forms/UpdateMedicationForm';
import MedicationLandingComponent from './components/Landing Pages/MedicationLandingComponent';
import Dashboard from './components/Dashboard';
import AddMedicationForm from './components/Forms/AddMedicationForm';
import DripOrderLandingComponent from './components/Landing Pages/DripOrderLandingComponent';
import DripOrderGridComponent from './components/Grids/DripOrderGridComponent';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/medications' element={<MedicationLandingComponent/>}></Route>
        <Route path='/medications/add' element={<AddMedicationForm/>}></Route>
        <Route path='/medications/view' element={<MedicationGridComponent/>}></Route>
        <Route path='/medications/update/:index' element={<UpdateMedicationForm/>}></Route>
        <Route path='/drip-orders' element={<DripOrderLandingComponent/>}></Route>
        <Route path='/drip-orders/view' element={<DripOrderGridComponent/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
