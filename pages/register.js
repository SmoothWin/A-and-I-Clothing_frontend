import Navbar from "../components/Navbar";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import { useRouter } from "next/router";
import {useState} from "react";
import axios from "axios";
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';
import styles from "../styles/Home.module.css";

//custom imports
import url from "../config/config"

export default function Register() {
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
            document.getElementById("emailSpan").innerHTML="Please fill out the email";
        }
        else if(input.length < 5){
            document.getElementById("emailSpan").innerHTML="Email has to have more than 4 letters";
        }
        else if(!input.match(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)){
            document.getElementById("emailSpan").innerHTML="Enter email in the correct form";
        }
        else{
            document.getElementById("emailSpan").innerHTML="";
            setEmail(input)
        }
    }
    function handlePhoneNumber(e){
        let input = e;
        if(setCountry === undefined){
            document.getElementById("countrySpan").innerHTML="Please select a country";
        }
        else if(input === null){
            document.getElementById("phoneNumberSpan").innerHTML="Please fill out the phone number";
        }
        else if(Math.ceil(Math.log10(input + 1)) < 10){
            document.getElementById("phoneNumberSpan").innerHTML="Phone number has to have 10 numbers";
        }
        else{
            document.getElementById("phoneNumberSpan").innerHTML="";
            setPhoneNumber(input)
        }
    }
    function handleCountry(e){
        let input = e;
        if(input === null){
            document.getElementById("countrySpan").innerHTML="Please select a country";
        }
        else if(input === undefined){
            document.getElementById("countrySpan").innerHTML="Please select a country";
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
            document.getElementById("confirmPasswordSpan").innerHTML="Password has to match";
        }
        else{
            document.getElementById("confirmPasswordSpan").innerHTML="";
            setConfirmPassword(input)
        }
    }
    function handleFirstName(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("firstNameSpan").innerHTML="Please fill out the first name";
        }
        else if(!input.match(/^[A-Za-z]+$/)){
            document.getElementById("firstNameSpan").innerHTML="Enter only letters";
        }
        else if(input.length < 2){
            document.getElementById("firstNameSpan").innerHTML="First name has to have more than 2 letters";
        }
        else{
            document.getElementById("firstNameSpan").innerHTML="";
            setFirstName(input)
        }
    }
    function handleLastName(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("lastNameSpan").innerHTML="Please fill out the last name";
        }
        else if(!input.match(/^[A-Za-z]+$/)){
            document.getElementById("lastNameSpan").innerHTML="Enter only letters";
        }
        else if(input.length < 2){
            document.getElementById("lastNameSpan").innerHTML="Last name has to have more than 2 letters";
        }
        else{
            document.getElementById("lastNameSpan").innerHTML="";
            setLastName(input)
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
    function handleCivicNumber(e){
        let input = e.target.value;
        if(input.match(/[0-9]+/)){
            document.getElementById("civicSpan").innerHTML="Apartment should be only numbers";
        }
        else{
            document.getElementById("civicSpan").innerHTML="";
            setCivicNumber(input)
        }
    }
    function handleAddress(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("addressSpan").innerHTML="Please fill out the address";
        }
        else if(!input.match(/\d+(\s\w+)(\s\w+)+/)){
            document.getElementById("addressSpan").innerHTML="Address needs to contain building number, road type and road name";
        }
        else{
            document.getElementById("addressSpan").innerHTML="";
            setAddress(input)
        }
    }
    function handleCity(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("citySpan").innerHTML="Please fill out the city name";
        }
        else if(!input.match(/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/)){
            document.getElementById("citySpan").innerHTML="City name must not contain any numbers";
        }
        else{
            document.getElementById("citySpan").innerHTML="";
            setCity(input)
        }
    }
    function handlePostalCode(e){
        let input = e.target.value;
        if(input === ""){
            document.getElementById("postalCodeSpan").innerHTML="Please fill out the postal code";
        }
        else if(input.length < 5){
            document.getElementById("postalCodeSpan").innerHTML="Postal Code must have at least 5 characters";
        }
        else{
            document.getElementById("postalCodeSpan").innerHTML="";
            setPostalCode(input)
        }
    }
    function handleOrganisationName(e){
        let input = e.target.value;
        if(input.length < 3 && input !== ""){
            document.getElementById("organisationSpan").innerHTML="Organisation name must have at least 3 characters";
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
                document.getElementById("submitSpan").innerHTML = "Please fill out the missing fields"
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
                    <h3>Register</h3>
                    <span className="alert-danger" id="submitSpan"></span>

                    <div className="form-group">
                        <label>First name<b className="text-danger"> *</b></label>
                        <input id="register_fName" type="text" className="form-control" placeholder="First name" onChange={handleFirstName}/>
                        <span className="alert-danger" id="firstNameSpan"></span>
                    </div>

                    <div className="form-group">
                        <label>Last name<b className="text-danger"> *</b></label><br/>
                        <input id="register_lName" type="text" className="form-control" placeholder="Last name" onChange={handleLastName}/>
                        <span className="alert-danger" id="lastNameSpan"></span>
                    </div>

                    <div className="form-group">
                        <label>Email address<b className="text-danger"> *</b></label>
                        <input id="register_email" type="email" className="form-control" placeholder="Enter email" onChange={handleEmail}/>
                        <span className="alert-danger" id="emailSpan"></span>
                    </div>

                    <div className="form-group">
                        <label>Password<b className="text-danger"> *</b></label>
                        <input id="register_password" type="password" className="form-control" placeholder="Enter password" onChange={handlePassword}/>
                        <span className="alert-danger" id="passwordSpan"></span>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password<b className="text-danger"> *</b></label>
                        <input id="register_cpassword" type="password" className="form-control" placeholder="Confirm password" onChange={handleConfirmPassword}/>
                        <span className="alert-danger" id="confirmPasswordSpan"></span>
                    </div>

                    <div className="form-group">
                        <div>
                            <label htmlFor="phoneNumber">Phone Number<b className="text-danger"> *</b></label>
                        </div>
                            <CountrySelect id="register_country" labels={en} value={country} onChange={handleCountry} name="countrySelect" />&nbsp;&nbsp;&nbsp;
                            <Input id="register_phone" country={country} value={phoneNumber} onChange={handlePhoneNumber} placeholder="Enter phone number" name="phoneNumber" />
                        <span className="alert-danger" id="phoneNumberSpan"></span>
                        <span className="alert-danger" id="countrySpan"></span>
                    </div>
                    <div className="form-group">
                        <label>Address<b className="text-danger"> *</b></label>
                        <input id="register_address" type="text" className="form-control" placeholder="Address" onChange={handleAddress}/>
                        <span className="alert-danger" id="addressSpan"></span>
                    </div>
                    <div className="form-group">
                        <label>Apartment Number</label>
                        <input id="register_apartNum" type="text" className="form-control" placeholder="Apartment number" onChange={handleCivicNumber}/>
                        <span className="alert-danger" id="civicSpan"></span>
                    </div>
                    <div className="form-group">
                        <label>City<b className="text-danger"> *</b></label>
                        <input id="register_city" type="text" className="form-control" placeholder="City" onChange={handleCity}/>
                        <span className="alert-danger" id="citySpan"></span>
                    </div>
                    <div className="form-group">
                        <label>Postal Code<b className="text-danger"> *</b></label>
                        <input id="register_postal" type="text" className="form-control" placeholder="Postal code" onChange={handlePostalCode}/>
                        <span className="alert-danger" id="postalCodeSpan"></span>
                    </div>
                    <div className="form-group">
                        <label>Organisation Name</label>
                        <input id="register_org" type="text" className="form-control" placeholder="Organisation name" onChange={handleOrganisationName}/>
                        <span className="alert-danger" id="organisationSpan"></span>
                    </div>
                    <br/>
                    <button id="register_btn" type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    ); }
