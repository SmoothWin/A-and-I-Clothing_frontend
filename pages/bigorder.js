import {useEffect, useState} from "react";
import axios from 'axios';
import Head from "next/head";
import { useRouter } from 'next/router'
import BootstrapJS from '../components/Bootstrap'
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

//custom imports
import url from "../config/config"
import {useTranslation} from "../utilities/internationalization"

export default function Bigorder(){
    const {t} = useTranslation()
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])

    function onChangeHandler(e){
        setSelectedFile(e.target.files[0])
    }

    /**
     * @param {FormData} formData form data list where the file submission file is in
     */
    async function submitFile(formData){
        let response = await axios.post(`${url}/bigorders/upload`, formData,{ 
            withCredentials:true, headers:{"csrf-token":localStorage._csrf}
        })
        setMessage(response.data.message)
        document.getElementById("file_form").value = '';
        setSelectedFile(null)
    }

    async function onClickHandler(e){
        if(selectedFile == null) return
        const data = new FormData() 
        data.append('file', selectedFile)
        try{
            await submitFile(data)
        }catch(e){
            if(e.response.status == 401 || e.response.status == 403){
                await axios.post(`${url}/token`,null,{withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
                await submitFile(data)
            }
        }
    }
    return (
        <div>
        <Head>
            <title>{t("bigorder_title")}</title>
            <BootstrapJS/>
        </Head>
        <Navbar/>
            <br/>
            <br/>
            <div className="container-sm">
        <div className="d-flex flex-column flex-md-row">
            <div className="col-12 col-md-6 mx-1">
                <h2 className="display-4 col-10 mx-6 text-sm-start">{t("bigorder_h2")}</h2>
                <br/>
                <br/>
                <p className="text-secondary pt-3 fs-5">{t("bigorder_order_title")}</p>
                <p className="text-secondary pt-4 fs-5">{t("bigorder_step1")}</p>
                <p className="text-secondary pt-4 fs-5">{t("bigorder_step2")}</p>
                <p className="text-secondary pt-4 fs-5">{t("bigorder_step3")}</p>
                <p className="text-secondary pt-4 fs-5">{t("bigorder_step4")}</p>
                
            </div>
                <img className="img-thumbnail h-25 w-50 mt-auto mb-auto mx-auto" src="/image.png"/>
        </div>
                    
        <div className="d-flex flex-column">
            <a className="col-12 mt-3 btn btn-danger btn-lg" href="/bigorder_template.csv" download>{t("bigorder_download")}</a>
            <div className="col-12 mt-3 form-group">
                <input className="form-control" id="file_form" type="file" accept=".csv"
                onChange={onChangeHandler}
                />
            </div>
            <button type="button" className="col-12 mt-3 btn btn-danger btn-lg" onClick={onClickHandler}>{t("bigorder_send")}</button>
        </div>

        <div className="mx-auto mt-3 text-center text-success">{message}</div>
            </div>
            
        </div>
    )
}