import Navbar from "../components/Navbar";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import {useState} from "react";
import axios from "axios";

export default function login() {
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    function handleEmail(e){
        setEmail(e.target.value)
    }
    function handlePassword(e){
        setPassword(e.target.value)
    }
    function onSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:8000/login", {email:email, password: password}, {withCredentials:true})
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

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handlePassword}/>
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
