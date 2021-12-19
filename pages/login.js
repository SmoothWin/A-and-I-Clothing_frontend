import Navbar from "../components/Navbar";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import {useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function login() {
    const router = useRouter();
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    function handleEmail(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("emailSpan").innerHTML="Please fill out the email";
        }
        else if(!input.match(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)){
            document.getElementById("emailSpan").innerHTML="Enter email in the correct form";
        }
        else if(input.length < 5){
            document.getElementById("emailSpan").innerHTML="Email has to have more than 4 letters";
        }
        else{
            document.getElementById("emailSpan").innerHTML="";
            setEmail(input)
        }
    }
    function handlePassword(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("passwordSpan").innerHTML="Please fill out the password";
        }
        else if(!input.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            document.getElementById("passwordSpan").innerHTML="Password needs to have at least 1 letter, 1 number and 1 special character";
        }
        else if(input.length < 8){
            document.getElementById("passwordSpan").innerHTML="Password must have at least 8 characters";
        }
        else{
            document.getElementById("passwordSpan").innerHTML="";
            setPassword(input)
        }
    }
    async function onSubmit(e){
        e.preventDefault()
        try{
            if(password === null){
                document.getElementById("submitSpan").innerHTML="Please enter the password"
            }
            else if(email === null){
                document.getElementById("submitSpan").innerHTML="Please enter the email"
            }
            else {
                axios.post("http://localhost:8000/login", {email: email, password: password}, {withCredentials: true})
            }
        }catch(e){
            document.getElementById("submitSpan").innerHTML="Something went wrong with the login process"
        }
    }
    return (
        <>
            <Head>
            <title>{"Login - A&I Clothing"}</title>
            <BootstrapJS/>
        </Head>
            <Navbar/>
            <br/>
            <br/>
            <div className="container-sm">
            <form onSubmit={onSubmit}>
                <h3>Sign In</h3>
                <span className="alert-danger" id="submitSpan"></span>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmail}/>
                    <span className="alert-danger" id="emailSpan"></span>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handlePassword}/>
                    <span className="alert-danger" id="passwordSpan"></span>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
                </div>
        </>
    ); }
