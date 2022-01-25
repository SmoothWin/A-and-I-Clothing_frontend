import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//components
import Navbar from '../components/Navbar'

//utility
import {returnNumberDecimals} from '../utilities/transformCurrencyString'

export default function Cancel(){
   
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)
    })

    

    

    return (
        <>
        <Navbar/>
        <p>Checkout has been canceled</p>
        </>
    )
}