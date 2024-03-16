"use client"

import axios from "axios";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { InputLable } from "@/components/InputLable"

export default function SignupPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDissable, setButtonDissable] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();



    useEffect(() => {
        if (user.username.length > 1 && user.email.length > 1 && user.password.length > 1) {
            setButtonDissable(false);
        } else {
            setButtonDissable(true);
        }

    }, [user]);

    async function onSignup() {
        try {
            setLoading(true);
            const responce = await axios.post("/api/users/signup", user);
            console.log("Signup success : " + responce.data);
            router.push("/login")

            setTimeout(() => {

            }, 10 * 1000);

        } catch (error: any) {
            console.log("Signup failed : " + error.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="flex flex-col justify-center h-screen bg-slate-700 ">
            <div className="bg-slate-950 m-auto p-7 rounded-md">
                <div className="flex flex-col items-center space-y-10">
                    <h1 className="text-3xl font-bold  text-blue-950">Signup</h1>
                    {loading ? <p className="text-sm text-white p-1">signing in ...</p> : null}
                    <div className="space-y-5">
                        <div className="flex flex-col w-80 ">
                            <label htmlFor="username" className="p-1 font-semibold text-black">username</label>
                            <input
                                type="text"
                                placeholder="username"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className="p-2 border-0 text-black rounded-md"
                            />
                        </div>
                        <div className="flex flex-col w-80 ">
                            <label htmlFor="email" className="p-1 font-semibold text-black">email</label>
                            <input type="text"
                                placeholder="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="p-2 border-0 text-black rounded-md"
                            />
                        </div>
                        <div className="flex flex-col w-80 ">
                            <label htmlFor="password" className="p-1 font-semibold text-black">password</label>
                            <input
                                type="password"
                                placeholder="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="p-2 border-0 text-black rounded-md" />
                        </div>
                    </div>
                    <div>
                        <button onClick={onSignup} className="p-2 w-80 rounded-md bg-blue-700 hover:bg-blue-900 text-black">{buttonDissable ? "No Signin" : "Signin"}</button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div >
    )
}