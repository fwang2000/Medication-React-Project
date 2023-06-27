import { useNavigate } from "react-router-dom"

function MedicationLandingComponent() {

    const navigate = useNavigate();

    const handleAddClick = () => {

        navigate("./add");
    }

    const handleViewClick = () => {

        navigate("./view");
    }

    const handleBackClick = () => {
        navigate("/");
    }

    return(
        <div>
            <input type="button" value="Add Medication" onClick={handleAddClick}/>
            <input type="button" value="View" onClick={handleViewClick}/>
            <input type="button" value="Back" onClick={handleBackClick}/>
        </div>
    )
}

export default MedicationLandingComponent;