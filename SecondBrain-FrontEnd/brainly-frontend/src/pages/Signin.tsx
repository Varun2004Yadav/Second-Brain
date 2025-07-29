import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin(){
const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate();

 async function signin(){
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL+ "/api/v1/signin",{
            email,
            password
        
    })
    const jwt= response.data.token;
    localStorage.setItem("token",jwt);
    navigate("/dashboard");
    //redirect the user to the dashboard
    alert("You have signed in");
    console.log("Email", email ,  "password" , password);
    }

    return  (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8 ">
                <Input ref= {emailRef}placeholder="Email"/>
                <Input ref= {passwordRef}placeholder="Password"/>
                <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" size="sm" text="Signin" fullWidth={true}/>
                </div>
                <div className="text-blue-500 hover:underline flex justify-center pt-4">
                    <button onClick={() => navigate("/signup")}>
                    Create Account Sign up
                    </button>
                </div>
            </div>

        </div>
    )
}