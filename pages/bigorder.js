import {useEffect, useState} from "react";
import axios from 'axios';
import Head from "next/head";
import { useRouter } from 'next/router'
import BootstrapJS from '../components/Bootstrap'
import Navbar from "../components/Navbar";

export default function Bigorder(){
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])
    // useEffect(()=>{
    //     async function checkBigOrder(){
    //         try{
    //             if(mounted){
    //                 await axios.get("http://localhost:8000/bigorders", {withCredentials:true})
    //             }
    //         }
    //         catch (e){
    //             router.push('/login')
    //         }
    //     }
    //     checkBigOrder()

    // },[mounted])

    function onChangeHandler(e){
        setSelectedFile(e.target.files[0])
    }
    async function onClickHandler(e){
        const data = new FormData() 
        data.append('file', selectedFile)
        try{
            let response = await axios.post("http://localhost:8000/bigorders/upload", data,{ 
                withCredentials:true, headers:{"csrf-token":localStorage._csrf}
            })
            setMessage(response.data.message)
            document.getElementById("file_form").value = '';
            setSelectedFile(null)

        }catch(e){
            console.log(e)
        }
    }
    return (
        <>
        <Head>
            <title>{"Big Order - A&I Clothing"}</title>
            <BootstrapJS/>
        </Head>
        <Navbar/>
            <br/>
            <br/>
            <div className="container-sm">
        <div className="d-flex flex-column flex-md-row">
            <div className="col-12 col-md-6 mx-1">
                <h2 className="display-4 col-10 mx-6 text-sm-start">Business Orders</h2>
                <br/>
                <br/>
                <p className="text-secondary pt-3 fs-5">Steps for orders:</p>
                <p className="text-secondary pt-4 fs-5">1- Download the form and fill it out.</p>
                <p className="text-secondary pt-4 fs-5">2- Upload the form below and click Send Order.</p>
                <p className="text-secondary pt-4 fs-5">3- A business associate will contact you ASAP to give you a quote.</p>
                <p className="text-secondary pt-4 fs-5">4- Once everything is in order, we will prepare your order and bring it to you!</p>
                
            </div>
                <img className="img-thumbnail h-25 w-50 mt-auto mb-auto mx-auto" src="/image.png"/>
        </div>
            </div>
                    
        <div className="col-12 col-sm-8 col-md-10 col-lg-8 d-flex flex-column mx-auto justify-content-around">
            <a className="col-12 mt-3 btn btn-danger btn-lg" href="/bigorder_template.csv" download> Download Form</a>
            <div className="col-12 mt-3 form-group">
                <input className="form-control" id="file_form" type="file" accept=".csv"
                onChange={onChangeHandler}
                />
            </div>
            <button type="button" className="col-12 mt-3 btn btn-danger btn-lg" onClick={onClickHandler}>Send Order</button>
        </div>

        <div className="mx-auto mt-3 text-center text-success">{message}</div>
            
        </>
    )
}