import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [message, setMessage] = useState("");
    const { setToken } = useContext(UserContext);
    
    const navigate = useNavigate();

    function updateUser(e) {
        setUser({ ...user, [e.target.name]: e.target.value });

    }

    async function implementSignup(e) {
        e.preventDefault();

        if (!user.name || !user.email || !user.password || !user.confirmPassword) {
            setMessage("Please fill all the fields");
            alert("Please fill all the fields");
            return;
        }

        if (user.password != user.confirmPassword) {
            alert("password and confirm password doesn't match")
            setMessage("password and confirm password doesn't match");
            return;
        }

        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {
                name: user.name,
                email: user.email,
                password: user.password
            })

            console.log(response.data.message);
            setMessage(response.data.message);
            setToken(response.data.data.token);
            setUser({ name: "", email: "", password: "", confirmPassword: "" })
            setTimeout(() => {
                navigate("/dashboard")
            }, 1000);
        } catch (error) {
            console.error(error.response.data.message)
        }
    }

    function redirectToSignIn() {
        navigate("/")
    }

    return (
        <div className="form">
            <form onSubmit={implementSignup}>
                <input type="text" placeholder="Name" onChange={updateUser} name="name" value={user.name}/>
                <br />
                <input type="email" placeholder="Email" onChange={updateUser} name="email"value={user.email}/>
                <br />
                <input type="password" placeholder="Password" onChange={updateUser} name="password"value={user.password}/>
                <br />
                <input type="password" placeholder="Confirm Password" onChange={updateUser} name="confirmPassword"value={user.confirmPassword}/>
                <br />
                <button className="btn" type="submit">Signup</button>
            </form>
            <p>have an account ? <span onClick={redirectToSignIn}>Login</span></p>
        </div>
    )
}

export default Signup