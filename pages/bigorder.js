import { useState } from "react";
import axios from 'axios';
import Head from "next/head";

import BootstrapJS from '../components/Bootstrap'

export default function bigorder(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState(null)

    function onChangeHandler(e){
        setSelectedFile(e.target.files[0])
    }
    async function onClickHandler(e){
        const data = new FormData() 
        data.append('file', selectedFile)
        try{
            let response = await axios.post("http://localhost:8000/bigorders/upload", data,{ 
                // receive two    parameter endpoint url ,form data
            })
            console.log(response.data.message)
            setMessage(response.data.message)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <>
        <Head>
            <BootstrapJS/>
        </Head>
        
        <h2 className="display-4 col-10 mx-5 text-center text-sm-start">Special orders for Businesses</h2>
        <div className="container-sm d-flex flex-column flex-md-row">
            <div className="col-12 col-md-6 mx-1">
                <p className="text-secondary pt-3 fs-5">Steps for orders:</p>
                <p className="text-secondary pt-4 fs-5">1- Download the form and fill it out.</p>
                <p className="text-secondary pt-4 fs-5">2- Upload the form below and click Send Order.</p>
                <p className="text-secondary pt-4 fs-5">3- A business associate will contact you ASAP to give you a quote.</p>
                <p className="text-secondary pt-4 fs-5">4- Once everything is in order, we will prepare your order and bring it to you!</p>
                
            </div>
                <img className="img-thumbnail h-25 w-50 mt-auto mb-auto mx-auto" src="/image.png"/>
        </div>
            
                    
        <div className="col-12 col-sm-8 col-md-10 col-lg-8 d-flex flex-column mx-auto justify-content-around">
            <a className="col-12 mt-3 btn btn-danger btn-lg" href="/bigorder_template.csv" download> Download Form</a>
            <div className="col-12 mt-3 form-group">
                <input className="form-control" type="file" accept=".csv"
                onChange={onChangeHandler}
                />
            </div>
            <button type="button" className="col-12 mt-3 btn btn-danger btn-lg" onClick={onClickHandler}>Send Order</button>
        </div>

        <div className="mx-auto mt-3 text-center text-success">{message}</div>
            
        </>
    )
}