import { signupInput } from "@yadnyesh-dashpute/common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../pages/Config";
// import { Axios } from "axios";
import axios from 'axios';


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    
    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blog");
        } catch (e) {


        }

    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-3xl font-bold text-center mb-4">
                    Create an Account
                </div>
                <div className="text-slate-400 text-center mb-6">
                    {type === "signin" ? "Don't Have an Account ?" : "Already have an account?"}
                    <Link className="pl-2 underline text-blue-600" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>

                {type === "signup" ?
                <LabelledInput
                    label="Name"
                    placeholder="Name"
                    onChange={(e) => setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })} 
                    
                /> : null}

                <LabelledInput
                    label="Email"
                    placeholder="Email"
                    onChange={(e) => setPostInputs({
                        ...postInputs,
                        username: e.target.value // changed to "username" key
                    })}
                />
                <LabelledInput
                    label="Password"
                    type={"password"}
                    placeholder="Password"
                    onChange={(e) => setPostInputs({
                        ...postInputs,
                        password: e.target.value // changed to "password" key
                    })}
                />
                <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    );

}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-black">{label}</label>
        <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
