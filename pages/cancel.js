import { useEffect, useState } from 'react'

//components
import Navbar from '../components/Navbar'


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