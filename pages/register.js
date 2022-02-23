import Navbar from "../components/Navbar";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import { useRouter } from "next/router";
import {useState} from "react";
import axios from "axios";
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import fr from 'react-phone-number-input/locale/fr.json';
import 'react-phone-number-input/style.css';
import styles from "../styles/Home.module.css";

import cookie from "js-cookie"

//custom imports
import url from "../config/config"
import {useTranslation} from "../utilities/internationalization"

export default function Register() {
    const {t}=useTranslation()
    const router = useRouter()
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [confirmPassword,setConfirmPassword]=useState(null)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [country, setCountry] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [civicNumber,setCivicNumber]=useState(null)
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [organisationName, setOrganisationName] = useState(null);
    const CountrySelect = ({ value, onChange, labels, ...rest }) => (
        <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}>
            <option value="">{labels.ZZ}</option>
            {getCountries().map((country) => (
                <option key={country} value={country}>
                    {labels[country]} +{getCountryCallingCode(country)}
                </option>
            ))}
        </select>
    );
    function handleEmail(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("emailSpan").innerHTML=t("register_email_error1");
        }
        else if(input.length < 5){
            document.getElementById("emailSpan").innerHTML=t("register_email_error2");
        }
        else if(!input.match(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)){
            document.getElementById("emailSpan").innerHTML=t("register_email_error3");
        }
        else{
            document.getElementById("emailSpan").innerHTML="";
            setEmail(input)
        }
    }
    function handlePhoneNumber(e){
        let input = e;
        if(typeof country === undefined){
            document.getElementById("countrySpan").innerHTML=t("register_phone_error1");
        }
        else if(input === null){
            document.getElementById("phoneNumberSpan").innerHTML=t("register_phone_error2");
        }
        else if(Math.ceil(Math.log10(input + 1)) < 10){
            document.getElementById("phoneNumberSpan").innerHTML=t("register_phone_error3");
        }
        else{
            document.getElementById("phoneNumberSpan").innerHTML="";
            setPhoneNumber(input)
        }
    }
    function handleCountry(e){
        let input = e;
        if(input === null){
            document.getElementById("countrySpan").innerHTML=t("register_phone_error1");
        }
        else if(input === undefined){
            document.getElementById("countrySpan").innerHTML=t("register_phone_error1");
        }
        else{
            document.getElementById("countrySpan").innerHTML="";
            setCountry(input)
            setCountryCode(getCountryCallingCode(input))
        }
    }
    function handleConfirmPassword(e){
        let input = e.target.value;
        if(input !== password){
            document.getElementById("confirmPasswordSpan").innerHTML=t("register_cpass_error1");
        }
        else{
            document.getElementById("confirmPasswordSpan").innerHTML="";
            setConfirmPassword(input)
        }
    }
    function handleFirstName(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("firstNameSpan").innerHTML=t("register_fn_error1");
        }
        else if(!input.match(/^[A-Za-z]+$/)){
            document.getElementById("firstNameSpan").innerHTML=t("register_fn_error2");
        }
        else if(input.length < 2){
            document.getElementById("firstNameSpan").innerHTML=t("register_fn_error3");
        }
        else{
            document.getElementById("firstNameSpan").innerHTML="";
            setFirstName(input)
        }
    }
    function handleLastName(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("lastNameSpan").innerHTML=t("register_ln_error1");
        }
        else if(!input.match(/^[A-Za-z]+$/)){
            document.getElementById("lastNameSpan").innerHTML=t("register_ln_error2");
        }
        else if(input.length < 2){
            document.getElementById("lastNameSpan").innerHTML=t("register_ln_error3");
        }
        else{
            document.getElementById("lastNameSpan").innerHTML="";
            setLastName(input)
        }
    }
    function handlePassword(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("passwordSpan").innerHTML=t("register_pass_error1");
        }
        else if(!input.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            document.getElementById("passwordSpan").innerHTML=t("register_pass_error2");
        }
        else{
            document.getElementById("passwordSpan").innerHTML="";
            setPassword(input)
        }
    }
    function handleCivicNumber(e){
        let input = e.target.value;
        if(!input.match(/[0-9]+/)){
            document.getElementById("civicSpan").innerHTML=t("register_apartment_error1");
        }
        else{
            document.getElementById("civicSpan").innerHTML="";
            setCivicNumber(input)
        }
    }
    function handleAddress(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("addressSpan").innerHTML=t("register_address_error1");
        }
        else if(!input.match(/\d+(\s\w+)(\s\w+)+/)){
            document.getElementById("addressSpan").innerHTML=t("register_address_error2");
        }
        else{
            document.getElementById("addressSpan").innerHTML="";
            setAddress(input)
        }
    }
    function handleCity(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("citySpan").innerHTML=t("register_city_error1");
        }
        else if(!input.match(/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/)){
            document.getElementById("citySpan").innerHTML=t("register_city_error2");
        }
        else{
            document.getElementById("citySpan").innerHTML="";
            setCity(input)
        }
    }
    function handlePostalCode(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("postalCodeSpan").innerHTML=t("register_postal_error1");
        }
        else if(input.length < 5){
            document.getElementById("postalCodeSpan").innerHTML=t("register_postal_error2");
        }
        else{
            document.getElementById("postalCodeSpan").innerHTML="";
            setPostalCode(input)
        }
    }
    function handleOrganisationName(e){
        let input = e.target.value;
        if(input.length < 3 && input !== ""){
            document.getElementById("organisationSpan").innerHTML=t("register_org_error1");
        }
        else{
            document.getElementById("organisationSpan").innerHTML="";
            setOrganisationName(input)
        }
    }
    async function onSubmit(e) {
        e.preventDefault()

        try {
            if (firstName === null || lastName === null || email === null || password === null || confirmPassword === null || phoneNumber === "" || countryCode === null || countryCode === undefined || country === null || address === null || city === null || postalCode === null) {
                document.getElementById("submitSpan").innerHTML = t("register_submit_error")
            } else {
                document.getElementById("submitSpan").innerHTML = ""
                await axios.post(`${url}/register`, {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
                    "confirmpassword": confirmPassword,
                    "phoneCountryCode": countryCode,
                    "phoneNumber": phoneNumber.replace("+" + getCountryCallingCode(country), ""),
                    "address": address,
                    "buildingNumber": civicNumber,
                    "city": city,
                    "country": country,
                    "postalCode": postalCode,
                    "organizationName": organisationName
                }, {withCredentials: true, headers:{"csrf-token":localStorage._csrf}})
                await router.push('/login')
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <Head>
                <title>{t("register_title")}</title>
                <BootstrapJS/>
            </Head>
            <Navbar/>
            <br/>
            <br/>
            <div className="container col-lg-4">
                <form onSubmit={onSubmit}>
                    <h3 style={{textAlign: "center"}}>{t("register_h3")}</h3>
                    <br/>
                    <span className="alert-danger" id="submitSpan"/>

                    <div className="form-group">
                        <label>{t("register_fn")}<b className="text-danger"> *</b></label>
                        <input id="register_fName" type="text" className="form-control" placeholder={t("register_fn")} onChange={handleFirstName}/>
                        <span className="alert-danger" id="firstNameSpan"/>
                    </div>
                    <br/>

                    <div className="form-group">
                        <label>{t("register_ln")}<b className="text-danger"> *</b></label><br/>
                        <input id="register_lName" type="text" className="form-control" placeholder={t("register_ln")} onChange={handleLastName}/>
                        <span className="alert-danger" id="lastNameSpan"/>
                    </div>
                    <br/>

                    <div className="form-group">
                        <label>{t("register_email")}<b className="text-danger"> *</b></label>
                        <input id="register_email" type="email" className="form-control" placeholder={t("register_email_placeholder")} onChange={handleEmail}/>
                        <span className="alert-danger" id="emailSpan"/>
                    </div>
                    <br/>

                    <div className="form-group">
                        <label>{t("register_pass")}<b className="text-danger"> *</b></label>
                        <input id="register_password" type="password" className="form-control" placeholder={t("register_pass_placeholder")} onChange={handlePassword}/>
                        <span className="alert-danger" id="passwordSpan"/>
                    </div>
                    <br/>

                    <div className="form-group">
                        <label>{t("register_cpass")}<b className="text-danger"> *</b></label>
                        <input id="register_cpassword" type="password" className="form-control" placeholder={t("register_cpass")} onChange={handleConfirmPassword}/>
                        <span className="alert-danger" id="confirmPasswordSpan"/>
                    </div>
                    <br/>

                    <div className="form-group">
                        <div>
                            <label htmlFor="phoneNumber">{t("register_phone")}<b className="text-danger"> *</b></label>
                        </div>
                            <CountrySelect id="register_country" labels={cookie.get("i18next") == "en"?en:fr} value={country} onChange={handleCountry} name="countrySelect" />&nbsp;&nbsp;&nbsp;
                            <Input id="register_phone" country={country} value={phoneNumber} onChange={handlePhoneNumber} placeholder={t("register_phone_placeholder")} name="phoneNumber" />
                        <span className="alert-danger" id="phoneNumberSpan"/>
                        <span className="alert-danger" id="countrySpan"/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>{t("register_address")}<b className="text-danger"> *</b></label>
                        <input id="register_address" type="text" className="form-control" placeholder={t("register_address")} onChange={handleAddress}/>
                        <span className="alert-danger" id="addressSpan"/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>{t("register_apartment")}</label>
                        <input id="register_apartNum" type="text" className="form-control" placeholder={t("register_apartment")} onChange={handleCivicNumber}/>
                        <span className="alert-danger" id="civicSpan"/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>{t("register_city")}<b className="text-danger"> *</b></label>
                        <input id="register_city" type="text" className="form-control" placeholder={t("register_city")} onChange={handleCity}/>
                        <span className="alert-danger" id="citySpan"/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>{t("register_postal")}<b className="text-danger"> *</b></label>
                        <input id="register_postal" type="text" className="form-control" placeholder={t("register_postal")} onChange={handlePostalCode}/>
                        <span className="alert-danger" id="postalCodeSpan"/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>{t("register_org")}</label>
                        <input id="register_org" type="text" className="form-control" placeholder={t("register_org")} onChange={handleOrganisationName}/>
                        <span className="alert-danger" id="organisationSpan"/>
                    </div>
                    <br/>
                    <button id="register_btn" type="submit" className="btn btn-primary btn-block">{t("register_submit")}</button>
                </form>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    ); }
