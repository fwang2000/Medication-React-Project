import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleMedicationClick = () => {

        navigate("./medications");
    }

    return(
        <div>
            <input type="button" value="Medication" onClick={handleMedicationClick}/>
        </div>
    )
}

export default Dashboard;