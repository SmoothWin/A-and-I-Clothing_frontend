import Head from 'next/head'
import { useEffect, useState } from 'react'

//components
import Navbar from '../components/Navbar'

// custom imports
import {useTranslation} from "../utilities/internationalization"


export default function Cancel(){
    const {t} = useTranslation()
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)
    })

    

    

    return (
        <>
        <Head>
            <title>{t("canceled_title")}</title>
        </Head>
        <Navbar/>
        <p style={{fontSize:"1.5rem" ,width:"100%", display:"flex", height:"100px", alignItems:"center", justifyContent:"center"}}>{t("canceled_cancel")}</p>
        </>
    )
}