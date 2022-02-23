import Navbar from "../components/Navbar";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

//custom imports
import url from "../config/config"
import {useTranslation} from "../utilities/internationalization"


export default function Login() {
    const {t} = useTranslation()
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
            document.getElementById("customCheck1").checked = (typeof localStorage.rememberMe == "undefined")?checked:JSON.parse(localStorage.rememberMe)
        }
    },[mounted])

    function handleEmail(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("emailSpan").innerHTML=t("login_email_error1");
        }
        else if(!input.match(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)){
            document.getElementById("emailSpan").innerHTML=t("login_email_error2");
        }
        else if(input.length < 5){
            document.getElementById("emailSpan").innerHTML=t("login_email_error3");
        }
        else{
            document.getElementById("emailSpan").innerHTML="";
            setEmail(input)
        }
    }
    function handlePassword(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("passwordSpan").innerHTML=t("login_pass_error1");
        }
        else if(!input.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            document.getElementById("passwordSpan").innerHTML=t("login_pass_error2");
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
                document.getElementById("submitSpan").innerHTML=t("login_submit_error1")
            }
            else if(email === null){
                document.getElementById("submitSpan").innerHTML=t("login_submit_error2");
            }
            else {
                let response = await axios.post(`${url}/login`, {email: email, password: password, checked: checked}, {withCredentials: true, headers:{"csrf-token":localStorage._csrf}})
                localStorage.rememberMe = checked
                localStorage.username = response.data.firstName +" "+response.data.lastName.charAt(0)+"."
                
                router.push("/")
            }
        }catch(e){
            if(e.response?.status == 429){
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
        <div>
            <Head>
            <title>{t("login_title")}</title>
            <BootstrapJS/>
        </Head>
            <Navbar/>
            <br/>
            <br/>
            <div className="container col-lg-4">
            <form onSubmit={onSubmit}>
                <h3 style={{textAlign: "center"}}>{t("login_signin")}</h3>
                <br/>
                <span className="alert-danger" id="submitSpan"/>

                <div className="form-group">
                    <label>{t("login_email")}</label>
                    <input type="email" className="form-control" placeholder={t("login_email_placeholder")} onChange={handleEmail}/>
                    <span className="alert-danger" id="emailSpan"/>
                </div>
                <br/>

                <div className="form-group">
                    <label>{t("login_pass")}</label>
                    <input type="password" className="form-control" placeholder={t("login_pass_placeholder")} onChange={handlePassword}/>
                    <span className="alert-danger" id="passwordSpan"/>
                </div>
                <br/>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" onClick={handleCheck} id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">&nbsp;{t("login_remember")}</label>
                    </div>
                </div>
                <br/>

                <button type="submit" className="btn btn-primary btn-block">{t("login_submit")}</button>
                <br/>
            </form>
                </div>
        </div>
    ); }
