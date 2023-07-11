import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const handleLoginClick = () => {

        navigate("/login");
    }

    const handleRegisterClick = () => {

        navigate("/register");
    }


    return (
        <div>
            <input type="button" value="Login" onClick={handleLoginClick}/>
            <input type="button" value="Register" onClick={handleRegisterClick}/>
        </div>
    )
}

export default Home;