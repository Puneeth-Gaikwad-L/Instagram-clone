import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {


    const navigate = useNavigate();

    const [joke, setJoke] = useState("");
    const [name, setName] = useState("");
    const { token, setToken } = useContext(UserContext);
    const [feed, setFeed] = useState([]);


    console.log(token);

    console.log(feed);


    useEffect(() => {
        if (token == "") {
            let localTokenJSON = localStorage.getItem("token");
            if (localTokenJSON == undefined) {
                navigate("/")

            } else {
                setToken(JSON.parse(localTokenJSON));
            }
        }
    }, [])

    useEffect(() => {
        getJokes();
    }, [token])

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

    async function logOutImpl() {
        try {
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            localStorage.removeItem("token")
            setToken("");
            setName("");
            setJoke("");
            navigate("/")
        } catch (error) {
            console.error(error.response)
        }
    }

    return (
        <div className="dashboard">
            <div className="welcome"><h3>Welcome <span className="dashboard-name">{name}</span></h3>
                <button className="btn" onClick={logOutImpl}>Logout</button>
            </div>
            <div className="feed">
                <p>{ joke }</p>
            </div>
            <button className="btn">feed</button>
        </div>
    )
}

export default Dashboard;