import './App.css';
import { Route, Routes } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import MedicationGridComponent from './Medication/components/MedicationGridComponent';
import UpdateMedicationForm from './Medication/components/forms/UpdateMedicationForm';
import MedicationLandingComponent from './Medication/components/MedicationLandingComponent';
import Dashboard from './Dashboard';
import AddMedicationForm from "./Medication/components/forms/AddMedicationForm";
import DripOrderLandingComponent from './Drip-Orders/components/DripOrderLandingComponent';
import DripOrderGridComponent from './Drip-Orders/components/DripOrderGridComponent';
import UpdateDOForm from './Drip-Orders/components/forms/UpdateDOForm';
import AddDOForm from './Drip-Orders/components/forms/AddDOForm';

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
        <Route path='/drip-orders/add' element={<AddDOForm/>}></Route>
        <Route path='/drip-orders/view' element={<DripOrderGridComponent/>}></Route>
        <Route path='/drip-orders/update/:index' element={<UpdateDOForm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
