import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
import LoginComponent from './Authentication/components/LoginComponent';
import RegistrationComponent from './Authentication/components/RegistrationComponent';
import Home from './Authentication/components/Home';
import IUser from './types/IUser';
import AuthService from './Authentication/services/AuthService';
import EventBus from './common/EventBus';
import AuthVerify from './common/AuthVerify';

function App() {

  const navigate = useNavigate();

  useEffect(() => {

      EventBus.on("logout", logOut);

      return () => {
        EventBus.remove("logout", logOut);
      }
  }, []);

  const logOut = () => {

    AuthService.logout();
    navigate("/");
  }

  return (
    <div className="App">

      <div className='route-container'>
        <Routes>
          <Route path='/' element={<Home logOut={logOut}/>}></Route>
          <Route path='/login' element={<LoginComponent/>}></Route>
          <Route path='/register' element={<RegistrationComponent/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
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
      
      <AuthVerify logOut={logOut}/>
    </div>
  );
}

export default App;
