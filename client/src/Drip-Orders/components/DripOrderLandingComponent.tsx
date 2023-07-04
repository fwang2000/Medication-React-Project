import { useNavigate } from "react-router-dom";

function DripOrderLandingComponent() {
    
    const navigate = useNavigate();

    const handleAddClick = () => {

        navigate("./add");
    }

    const handleViewClick = () => {

        navigate("./view");
    }

    const handleBackClick = () => {
        navigate("/dashboard");
    }

    return(
        <div>
            <input type="button" value="Add Drip Order" onClick={handleAddClick}/>
            <input type="button" value="View" onClick={handleViewClick}/>
            <input type="button" value="Back" onClick={handleBackClick}/>
        </div>
    );
}

export default DripOrderLandingComponent;