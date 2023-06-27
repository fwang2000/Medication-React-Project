import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleMedicationClick = () => {

        navigate("/medications");
    }

    const handleDOClick = () => {

        navigate("/drip-orders");
    }

    return(
        <div>
            <input type="button" value="Medication" onClick={handleMedicationClick}/>
            <input type="button" value="Drip Orders" onClick={handleDOClick}/>
        </div>
    )
}

export default Dashboard;