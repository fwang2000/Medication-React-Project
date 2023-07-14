import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleMedicationClick = () => {

        navigate("/medications");
    }

    const handleDOClick = () => {

        navigate("/drip-orders");
    }

    const handleHomeClick = () => {

        navigate("/");
    }

    return(
        <div>
            <input type="button" value="Medication" onClick={handleMedicationClick}/>
            <input type="button" value="Drip Orders" onClick={handleDOClick}/>
            <input type="button" value="Home" onClick={handleHomeClick}/>
        </div>
    )
}

export default Dashboard;