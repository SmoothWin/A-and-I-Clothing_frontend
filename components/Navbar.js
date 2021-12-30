import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//custom imports
import BootstrapJS from './Bootstrap'
import Spinner from "../components/Spinner"
import Head from 'next/head'

export default function Navbar(){
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)
    const [username, setUsername] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setIsMounted(true)
    })

    useEffect(()=>{
        
        async function check(){//this is where we handle redirections
            if(isMounted){
                setTimeout(async ()=>{
            
                //set an axios check if user is logged in on validation endpoint //for user experience
                try{
                    if(localStorage.username)
                    setUsername(localStorage.username)
                    let response = await axios.post("http://localhost:8000/check",null, {withCredentials:true})
                    
                    if(response.data){
                        if(router.pathname == "/login" || router.pathname == "/register"){
                            router.push("/")
                        }
                        localStorage.username = response.data.firstName+" "+response.data.lastName.charAt(0)+"."
                        setUsername(response.data.firstName+" "+response.data.lastName.charAt(0)+".")
                    }
                    
                    setLoading(false)
                    
                }catch(e){
                    if(router.pathname == "/bigorder"){
                        router.push("/login")
                    }
                    setLoading(false)
                }
            },700)
            }
        }
        check();
        
    },[isMounted])

    async function handleLogout(){
        try{
            localStorage.removeItem("username")
            setUsername(null)
            await axios.post("http://localhost:8000/logout",null,{withCredentials: true})
        }catch(e){

        }
    }

    let right = null
    let loader = <Spinner/>
    if(loading == false){
        loader = null
    }
    if(username){
        right = 
        <div className="d-flex align-items-center">
            <span className='nav-item'>{username}</span>
            <a className='nav-link' role="button" onClick={handleLogout}>Logout</a>
        </div>
        
    }else{
        right= 
        <div className="d-flex">
            <Link href="/register"><a className="nav-link">Register</a></Link>
            <Link href="/login"><a className="nav-link">Login</a></Link>
        </div>
    }

    
    return(
        <>
        <Head>
            <BootstrapJS/>
        </Head>
            {loader}
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{color:"black", fontWeight:"bold", fontFamily:"\"Times New Roman\", Times, serif", textDecorationLine:"underline", textDecorationColor:"red"}}>A & I Clothing</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link href="/"><a className="nav-link">Home</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/bigorder"><a className="nav-link">Big Order</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/store"><a className="nav-link">Store</a></Link>
                            </li>
                        </ul>
                        {right}
                    </div>
                </div>
            </nav>
        </>
    )
}