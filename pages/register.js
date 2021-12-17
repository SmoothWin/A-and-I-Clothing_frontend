import Navbar from "../components/Navbar";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import { useRouter } from "next/router";
import {useState} from "react";
import axios from "axios";
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';

export default function register() {
    const router = useRouter()
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [confirmPassword,setConfirmPassword]=useState(null)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [country, setCountry] = useState(null);
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
        setEmail(e.target.value)
    }
    function handleConfirmPassword(e){
        setConfirmPassword(e.target.value)
    }
    function handleFirstName(e){
        setFirstName(e.target.value)
    }
    function handleLastName(e){
        setLastName(e.target.value)
    }
    function handlePassword(e){
        setPassword(e.target.value)
    }
    function handleCivicNumber(e){
        setCivicNumber(e.target.value)
    }
    function handleAddress(e){
        setAddress(e.target.value)
    }
    function handleCity(e){
        setCity(e.target.value)
    }
    function handlePostalCode(e){
        setPostalCode(e.target.value)
    }
    function handleOrganisationName(e){
        setOrganisationName(e.target.value)
    }
    async function onSubmit(e){
        e.preventDefault()
        try{
            await axios.post("http://localhost:8000/register", {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "confirmpassword":confirmPassword,
                "phoneCountryCode":getCountryCallingCode(country),
                "phoneNumber":phoneNumber.replace("+" + getCountryCallingCode(country), ""),
                "address":address,
                "buildingNumber":civicNumber,
                "city":city,
                "country":country,
                "postalCode":postalCode,
                "organizationName": organisationName
            }, {withCredentials:true})
            
            router.push('/login')
        }catch(e){
            console.log(e)
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
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={handleFirstName}/>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" onChange={handleLastName}/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={handlePassword}/>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm password" onChange={handleConfirmPassword}/>
                    </div>

                    <div className="form-group">
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                        </div>
                            <CountrySelect labels={en} value={country} onChange={setCountry} name="countrySelect" />&nbsp;&nbsp;&nbsp;
                            <Input country={country} value={phoneNumber} onChange={setPhoneNumber} placeholder="Enter phone number" name="phoneNumber" />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" onChange={handleAddress}/>
                    </div>
                    <div className="form-group">
                        <label>Apartment Number</label>
                        <input type="text" className="form-control" placeholder="Civic number" onChange={handleCivicNumber}/>
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" placeholder="City" onChange={handleCity}/>
                    </div>
                    <div className="form-group">
                        <label>Postal Code</label>
                        <input type="text" className="form-control" placeholder="Postal code" onChange={handlePostalCode}/>
                    </div>
                    <div className="form-group">
                        <label>Organisation Name</label>
                        <input type="text" className="form-control" placeholder="Organisation name" onChange={handleOrganisationName}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </>
    ); }
