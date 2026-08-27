"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [data, setData] = useState();

    useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
        axios.get("http://localhost:8000/api/getCurrentUser", {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then(result => {
            console.log(result.data);
            setData(result.data);
        })
        .catch(err => {
            console.log(err, "something went wrong while fetching user");
        });
    }, []);

    return (
        <main className="min-h-screen bg-linear-to-r from-[#29205f] via-[#202451] to-[#0c3141] flex items-center justify-center px-5">
            <h1 className="text-5xl md:text-7xl font-light text-[#d2c2ff] tracking-wide">
                Welcome {data?.user?.username}
            </h1>
            
        </main>
    );
}