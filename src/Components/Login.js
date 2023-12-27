import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const { setToken } = useContext(UserContext)

    const navigate = useNavigate();

    function updateUser(e) {
        setUser({ ...user, [e.target.name]: e.target.value });

    }

    async function implementLogin(e) {
        e.preventDefault();
        if (!user.email || !user.password) {
            setMessage("Please fill all the fields");
            alert("Please fill all the fields");
            return;
        }
        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login", {
                email: user.email,
                password: user.password
            })

            console.log(response.data.message);
            setMessage(response.data.message)
            console.log(response.data.data.token);
            setToken(response.data.data.token);
            setUser({ email: "", password: "" });
            alert("login successful")
            setTimeout(() => {
                navigate("/dashboard")
            }, 2000);
        } catch (error) {
            console.error(error)
        }
    }

    function redirectToLogin() {
        navigate("/signup")
    }

    return (
        <div className="form">
            <form onSubmit={implementLogin}>
                <input type="email" placeholder="Email" onChange={updateUser} name="email" value={user.email} />
                <br />
                <input type="password" placeholder="Password" onChange={updateUser} name="password" value={user.password} />
                <br />
                <button className="btn" type="submit">Login</button>
            </form>

            <p>Don't have an account ? <span onClick={redirectToLogin}>Signup</span></p>
        </div>
    )
}

export default Login