import { useEffect, useState } from "react"
import axios from "axios"

//custom imports
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";

//custom utility imports
import {returnNumberDecimals} from "../../utilities/transformCurrencyString"

//custom api imports
import { addToCart, getCart } from "../../api/cart";
import Head from "next/head";
import BootstrapJS from "../../components/Bootstrap";

// const productUrl = "https://api.stripe.com/v1/products"

export default function Product(){
    const router = useRouter()
    const {productId} = router.query 
    const [isMounted, setIsMounted] = useState(false)
    const [product, setProduct] = useState(null)
    const [exists, setExists] = useState(true)

    useEffect(()=>{
        setIsMounted(true)
    })

    useEffect(()=>{
        if(!productId) return
        async function getData(){
            try{
                const responseData = await (await axios.get(`http://localhost:8000/v1/products/${productId}`, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})).data
                console.log(responseData)
                setProduct(responseData)
            }catch(e){
                console.log(e)
                setExists(false)
            }
        }
        if(isMounted)
            getData()
    },[isMounted,productId])


    async function handleItemClick(product){
        try{
            try{
                await getCart()
            }catch(e){
                
            }
            if(!localStorage.cart)
            localStorage.cart = JSON.stringify({"items":[]})
            const list = JSON.parse(localStorage?.cart)
            
            if(list.items.some(item=>item.id == product.id)){
                list.items.forEach(item => {
                    if(item.id == product.id){
                        item.quantity += 1
                    }
                });
            } else{
                list.items.push(product)
                list.items.forEach(item => {
                    if(item.id == product.id){
                        item.quantity = 1
                    }
                });
            }
            localStorage.setItem("cart", JSON.stringify(list))
            await addToCart()
        }catch(e){
            console.log(e)
        }
    }

    let item = null
    let display = null
    if(product != null){
        item = product
        display = 
        <div key={item?.id}>
            <Head>
                <title>{item?.name}{" - A&I Clothing"}</title>
                <BootstrapJS/>
            </Head>
            <br/>
            <h2 className="display-4 col-10 mx-6 text-sm-start"><b>&nbsp;&nbsp;&nbsp;Store</b></h2>
            <br/>
            <br/>
            <br/>
            <center>
            {(item.images[0])?<img width={600} src={item?.images[0]}/>:null}
                <br/>
                <br/>
            <h2>{item?.name}</h2>
            <span>Price: {`$${returnNumberDecimals(item?.pricedata.price_string)} ${item?.pricedata.currency.toUpperCase()}`}</span>
                <br/>
            <div>Description: {item?.description}</div>
                <br/>
            <button className="btn btn-success" onClick={(e)=>handleItemClick(item)}>Add to cart</button>
            </center>
        </div>
    }

    
    if(exists === false)
        display = 
        <div>
            The product doesn&apos;t exist
        </div>

    return(
    <>
        <Navbar/>
        {display}
    </>
    )
}