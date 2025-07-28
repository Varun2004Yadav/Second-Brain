import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Singup(){

 const emailRef = useRef<HTMLInputElement>(null);
 const passwordRef = useRef<HTMLInputElement>(null);
 const navigate = useNavigate();

 async function signup(){
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
   await axios.post(BACKEND_URL+ "/api/v1/signup",{
            email,
            password
        
    })
    navigate("/signin");
    alert("You have signed up");
    console.log("Email", email ,  "password" , password);
    }

    return  (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8 ">
                <Input ref= {emailRef} placeholder="Email"/>
                <Input ref={passwordRef} placeholder="Password"/>
                <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} variant="primary" size="sm" text="Signup" fullWidth={true}/>
                </div>
            </div>

        </div>
    )
}