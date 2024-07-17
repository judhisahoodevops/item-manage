import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    //alert('kk');
    const handleSubmit = async (e) => {
        setError("");
        e.preventDefault();
        try {
            await login(email, password);
            history.push("/items");
            //window.location.href = '/items'; // Redirect after login
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
