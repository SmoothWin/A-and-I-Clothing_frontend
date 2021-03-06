import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//components
import Navbar from '../components/Navbar'

//utility
import {returnNumberDecimals} from '../utilities/transformCurrencyString'
import {useTranslation} from "../utilities/internationalization"
import url from "../config/config"

import {addToCart} from "../api/cart"
import Head from 'next/head'

export default function Success(){
    const {t} = useTranslation()
    const router = useRouter()
    const {id} = router.query
    const [mounted, setMounted] = useState(false)
    const [session, setSession] = useState([{}])

    useEffect(()=>{
        setMounted(true)
    })

    useEffect(()=>{
        // console.log(mounted)
        async function getSession(id){
            try{
            const response = await axios.get(`${url}/checkout/session?id=${id}`, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
            const data = await response.data
            console.log(data.line_items)
            localStorage.cart = JSON.stringify({items:[]})
            await addToCart()

            setSession(data.line_items)

            }catch(e){
                console.log(e)
            }
        } 
        if(mounted)
            getSession(id)
            
    },[id])

    let sessionObj = []
    if(session.length > 0)
        sessionObj = session
        // console.log(sessionObj)

    return (
        <>
        <Head>
            <title>{t("success_title")}</title>
        </Head>
        <Navbar/>
        <div className='d-flex flex-column align-items-center align-items-sm-start flex-sm-row mx-2 justify-content-sm-center'>
        {
            (Object.values(sessionObj[0]).length < 1)?<div style={{fontSize:"1.5rem" ,width:"100%", display:"flex", height:"100px", alignItems:"center", justifyContent:"center"}} >No items to display</div>
            :sessionObj.map((x,k)=>
            <div key={k} className='mx-3 mt-2 mb-2'>
                <div>{x?.product_name}</div>
                <img height={100} src={(typeof x.images == "undefined")?null:x?.images[0]}/>
                <div>{`${t("success_ttl_qty")} ${x?.total_quantity}`}</div>
                <div className='d-flex'>
                    
                    
                    {Object.entries(x?.secondary_quantities||{})?.map(qty=>
                        <div key={qty[0]}>
                            <span className='mx-2'>{`${qty[0].replace("_quantity","")}: ${qty[1]}`}</span>
                        </div>
                    )}
                </div>
            <div>{`${t("success_subtotal")} $${returnNumberDecimals(x.subtotal?.toString())}`}</div>
            <div>{`${t("success_total")} $${returnNumberDecimals(x.total?.toString())} `}</div>
            
            </div>
            
            )
        }
        </div>
        </>
    )
}