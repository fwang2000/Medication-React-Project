import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/AuthService";

function LoginComponent() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Login Status");

    const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {

        const password = e.target.value;
        setPassword(password);
    }

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();

        setMessage("Login Status:");
        setLoading(true);

        console.log(username, password);

        authService.login(username, password).then(
            () => {
                navigate("/dashboard");
                window.location.reload();
            },
            error => {
                const responseMessage = error.toString();

                console.log(error);

                setLoading(false);
                setMessage("Login Status: " + responseMessage);
            }
        );
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                    </button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                
            </form>
        </div>
    );
}

export default LoginComponent;