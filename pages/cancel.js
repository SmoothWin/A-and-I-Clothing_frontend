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
        <p style={{fontSize:"1.5rem" ,width:"100%", display:"flex", height:"100px", alignItems:"center", justifyContent:"center"}}>Checkout has been canceled</p>
        </>
    )
}