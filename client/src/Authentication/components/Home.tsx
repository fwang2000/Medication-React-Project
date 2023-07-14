import { useNavigate } from "react-router-dom";

function Home(props: any) {

    const currentUser = localStorage.getItem("user");

    const navigate = useNavigate();

    const handleLoginClick = () => {

        navigate("/login");
    }

    const handleLogoutClick = () => {

        props.logOut();
    }

    const handleRegisterClick = () => {

        navigate("/register");
    }

    return (
        <div>
            { currentUser ? (
                <div>
                    <input type="button" value="Logout" onClick={handleLogoutClick}/>
                </div>
            ) : (
                <div>
                    <input type="button" value="Login" onClick={handleLoginClick}/>
                    <input type="button" value="Register" onClick={handleRegisterClick}/>
                </div>
            ) }
        </div>
    )
}

export default Home;