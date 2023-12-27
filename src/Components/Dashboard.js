import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";

const Dashboard = () => {

    const [joke, setJoke] = useState("");
    const [name, setName] = useState("");
    const { token, setToken } = useContext(UserContext);


    useEffect(() => {
        getJokes();
    }, [])

    function getJokes() {
        axios.get("https://instagram-express-app.vercel.app/api/auth/zuku?=", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.data.message);
                setJoke(response.data.data.message)
                setName(response.data.data.user.name);
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <h1>Welcome {name}</h1>
            {
                <p>{joke}</p>
            }
        </div>
    )
}

export default Dashboard;