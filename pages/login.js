import Navbar from "../components/Navbar";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Login() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false)
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [checked, setChecked]=useState(false)

    useEffect(()=>{
        setMounted(true)
    })
    useEffect(()=>{
        if(mounted){
            console.log((typeof localStorage.rememberMe == "undefined")?false:localStorage.rememberMe)
            document.getElementById("customCheck1").checked = (typeof localStorage.rememberMe == "undefined")?checked:JSON.parse(localStorage.rememberMe)
        }
    },[mounted])

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
            document.getElementById("passwordSpan").innerHTML="Password needs to have at least 1 letter, 1 number, 1 special character and be at least 8 characters long";
        }
        else{
            document.getElementById("passwordSpan").innerHTML="";
            setPassword(input)
        }
    }
    async function onSubmit(e){
        
        try{
        e.preventDefault()
            if(password === null){
                document.getElementById("submitSpan").innerHTML="Please enter the password"
            }
            else if(email === null){
                document.getElementById("submitSpan").innerHTML="Please enter the email"
            }
            else {
                let response = await axios.post("http://localhost:8000/login", {email: email, password: password, checked: checked}, {withCredentials: true, headers:{"csrf-token":localStorage._csrf}})
                localStorage.rememberMe = checked
                localStorage.username = response.data.firstName +" "+response.data.lastName.charAt(0)+"."
                
                router.push("/")
            }
        }catch(e){
            if(e.response.status == 429){
                document.getElementById("submitSpan").innerHTML="Too many login attempts were made.\nPlease try again Later."
            }else{
                document.getElementById("submitSpan").innerHTML="Something went wrong with the login process"
            }
        }
    }
    function handleCheck(e){
        setChecked(e.target.checked)
    }
    return (
        <div className={styles.container}>
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
                        <input type="checkbox" className="custom-control-input" onClick={handleCheck} id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
                </div>
        </div>
    ); }
