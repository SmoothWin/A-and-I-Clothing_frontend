import { useState } from "react";
import axios from 'axios';
import Head from "next/head";

import BootstrapJS from '../components/Bootstrap'

export default function bigorder(){
    const [selectedFile, setSelectedFile] = useState(null);

    function onChangeHandler(e){
        setSelectedFile(e.target.files[0])
    }
    async function onClickHandler(e){
        const data = new FormData() 
        data.append('file', selectedFile)
        try{
            await axios.post("http://localhost:8000/bigorders/upload", data,{ 
                // receive two    parameter endpoint url ,form data
            })
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
            <div className="col-12 col-md-6">
                <p className="pt-3">Steps for orders:</p>
                <p className="pt-4">1- Download the form and fill it out.</p>
                <p className="pt-4">2- Upload the form below and click Send Order.</p>
                <p className="pt-4">3- A business associate will contact you ASAP to give you a quote.</p>
                <p className="pt-4">4- Once everything is in order, we will prepare your order and bring it to you!</p>
                
            </div>
                <img className="img-thumbnail h-75 mx-auto" height={300} src="/image.png"/>
            </div>
            
                <div className="row justify-content-around mx-5 pt-4">
                    <a className="btn btn-danger btn-lg" href="/bigorder_template.csv" download> Download Form</a>
                    <div className="form-group">
                        <input className="form-control" type="file" accept=".csv"
                        onChange={onChangeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-danger btn-lg" onClick={onClickHandler}>Send Order</button>
                </div>
            
        </>
    )
}