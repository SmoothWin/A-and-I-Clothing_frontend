import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//custom imports
import BootstrapJS from './Bootstrap'
import Spinner from "../components/Spinner"
import ShoppingCart from './ShoppingCart'
import url from "../config/config"

export default function Navbar(){
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)
    const [username, setUsername] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cartToggle, setCartToggle] = useState(false)

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
                    let csrf = await axios.get(`${url}/validator/checker`,{withCredentials:true})
                    let token = csrf.data.token
                    localStorage._csrf = token
                    let response = await axios.post(`${url}/check`,null, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
                    
                    if(response.data){
                        if(router.pathname == "/login" || router.pathname == "/register"){
                            router.push("/")
                        }
                        localStorage.username = response.data.firstName+" "+response.data.lastName.charAt(0)+"."
                        setUsername(response.data.firstName+" "+response.data.lastName.charAt(0)+".")
                    }
                    
                    setLoading(false)
                    
                }catch(e){
                    try{
                        const response = await axios.post(`${url}/token`,null,{withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
                        localStorage.username = response.data.firstName+" "+response.data.lastName.charAt(0)+"."
                        setUsername(response.data.firstName+" "+response.data.lastName.charAt(0)+".")
                        setLoading(false)
                    }catch(e){
                        if(router.pathname == "/bigorder"){
                            router.push("/login")
                        }
                        if(localStorage.username){
                            localStorage.removeItem("username")
                            setUsername(null)
                        }
                        setLoading(false)
                    }
                    
                }
            },700)
            }
        }
        check();
        
    },[isMounted])

    async function handleLogout(){
        try{
            
            await axios.post(`${url}/logout`,null,{withCredentials: true, headers:{"csrf-token":localStorage._csrf} })
            localStorage.removeItem("username")
            setUsername(null)
        }catch(e){

        }
    }

    function handleShoppingCart(){
        // console.log(cartToggle)
        if(cartToggle){
            setCartToggle(false)
            return
        }
        setCartToggle(true)
        
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
            <a id="logout_btn" className='nav-link' role="button" onClick={handleLogout}>Logout</a>
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
            <nav id="navbar" className="navbar navbar-expand-sm navbar-light bg-light" style={{zIndex:"100000"}}>
                <div className="container-fluid">
                    <Link href="/"><a className="navbar-brand" style={{color:"black", fontWeight:"bold", fontFamily:"\"Times New Roman\", Times, serif", textDecorationLine:"underline", textDecorationColor:"red"}}>A & I Clothing</a></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
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
            <div className='d-flex' style={{marginLeft:"auto"}}>
                <button id="cart_btn" onClick={handleShoppingCart} style={{marginRight:"20px"}}>&#128722;</button>
            </div>
            </nav>
            <ShoppingCart toggleCart={handleShoppingCart} isOn={cartToggle}/>
        </>
    )
}