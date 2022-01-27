import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import {loadStripe} from '@stripe/stripe-js';

//custom utility imports
import {returnNumberDecimals} from "../utilities/transformCurrencyString"

//custom imports
import {addToCart, getCart} from "../api/cart"

export default function ShoppingCart(props){
    const [isMounted, setIsMounted] = useState(false)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const contentfulLoader = ({ src, quality, width }) => {
    
        return `${src}`;
      };
    useEffect(()=>{
        setIsMounted(true)
    })
    async function getItems(){
        try{
            await getCart()
            
            setItems(JSON.parse(localStorage.getItem("cart"))?.items)
        }catch(e){
            setItems(JSON.parse(localStorage.getItem("cart"))?.items)
        }
    }

    useEffect(()=>{
        if(loading)
        setTimeout(()=>{
            setLoading(false)
        }, 700)
    },[items])

    useEffect(()=>{
        
        if(isMounted){
            document.addEventListener('itemInserted', async (e)=>{
                setLoading(true)
                setItems(JSON.parse(localStorage?.getItem("cart"))?.items)
            })
            getItems()
        }
        return document.removeEventListener('itemInserted',document)
    },[isMounted])

    useEffect(()=>{
        if(props.isOn){
            getItems()
        }
    },[props.isOn])

    async function removeItem(index){
        try{
        let stateItems = items;
        stateItems.splice(index, 1)
        setItems(stateItems)
        let cart = JSON.parse(localStorage.getItem("cart"))
        cart.items.splice(index, 1)
        localStorage.cart = JSON.stringify(cart)
        
        await addToCart()
        setItems(JSON.parse(localStorage?.getItem("cart"))?.items)
        
        }catch(e){
            console.log(e)
        }
    }

    async function handleDecrementQuantity(product){
        try{
            const cart = JSON.parse(localStorage?.cart)
            cart.items.forEach(async item=>{
                if(item.id === product.id){
                    if(item.quantity < 2) return
                    item.quantity = item.quantity - 1
                    localStorage.cart = JSON.stringify(cart)
                    await addToCart(localStorage.cart)
                    setItems(JSON.parse(localStorage?.getItem("cart"))?.items)

                }
            })
            

        }catch(e){

        }
    }
    function handleIncrementQuantity(product){
        try{
            const cart = JSON.parse(localStorage?.cart)
            cart.items.forEach(async item=>{
                if(item.id === product.id){
                    item.quantity = item.quantity + 1
                    
                    localStorage.cart = JSON.stringify(cart)
                    await addToCart()
                    setItems(JSON.parse(localStorage?.getItem("cart"))?.items)
                    
                }
            })

        }catch(e){

        }
    }

    async function handleCheckout(){
        try{
            const stripe = await loadStripe("pk_test_51KB1usFGY0rqHsBf7XJBHBigx5dDnWpznW6xppcjtVvoJEM6xSTxEevCTtnIqsEEBYUI4wF9F4k4uONww0NikGhl00jt17CWYM")
            
            const cart = JSON.parse(localStorage?.cart)
            const items_list = []

            cart.items.forEach((item)=>{
            const quantityCategories = {}
                Object.entries(item).forEach(x=>{
                    if(x[0].includes("_quantity")){
                        quantityCategories[x[0]]=x[1]
                    }
                })
                console.log(quantityCategories)
                items_list.push({
                    id:item.pricedata.id,
                    product_id:item.id,
                    tot_quantity:item.quantity,
                    category_quantities:quantityCategories
                })
            })
            const response = await axios.post("http://localhost:8000/checkout",{items:items_list}
            ,{withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
            
            stripe.redirectToCheckout({sessionId:response.data.id})
        }catch(e){
            console.log(e)
        }
    }


    let display = null
    let cartItems = null
    if(loading){
        cartItems = "Loading..."
    }
    else if(typeof items === "undefined"||items?.length < 1){
        cartItems = "Your shopping cart is empty"
    }
    else{
        cartItems =
    <div className="d-flex flex-column align-items-center" style={{overflowY:"auto", marginTop:"20px"}}>
                {items?.map((x, i)=><div className="d-flex flex-row justify-content-center" key={i}>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{width:"200px", height: "100px"}}>
                    {/* <img src={x.images[0]} style={{width:"90%", height:"100%"}}/>  */}
                    <Image unoptimized={true} placeholder="blur" blurDataURL="data:image/webp;base64,UklGRqoCAABXRUJQVlA4WAoAAAAgAAAAuAAAuAAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBsAAAA8AoAnQEquQC5AD7tdrhWqaclI6BIATAdiWlu4XaxG0AT2vRVwgyCGqpNdtouEGQQ1VJrttFwgyCGqpNdtouEGQQ1VJrttFwgyCGqpNdtouEGQQ1VJrttFwgyCGqpNdAAAP7/dCkAAAAAAAAA"
                           loader={contentfulLoader} src={x?.images[0]} height={80} width={120}/>
                    {/* try Image from next/Images */}
                    <div>{(typeof x?.pricedata === "undefined")?null:`$${returnNumberDecimals(x?.pricedata?.price_string, x?.quantity)} ${x?.pricedata?.currency.toUpperCase()}`}</div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-around">
                    <span>{x?.name}</span>
                    <text type={"number"}>{x?.quantity}</text>
                    <button className="btn btn-danger" onClick={()=>removeItem(i)}>Remove</button>
                </div>
                </div>)}
            </div>
    }
    
    if(props.isOn){
        display = 
        <div className="position-fixed d-flex flex-column justify-content-between" style={{right:"0", top:"0", zIndex: 100001,height:"100%",width:"320px", backgroundColor:"#f8f9fa", padding:"0 5px 0 5px", }}>
            <div className="d-flex align-items-center justify-content-end" style={{height:"60px"}}>
                <button onClick={props.toggleCart}>&#128722;</button>
            </div>
            <div className="d-flex flex-column justify-content-between" style={{height:"100%"}}>
                {cartItems}
                
                <button onClick={handleCheckout} className="btn btn-success" style={{width:"90%", marginLeft:"auto", marginRight:"auto", marginBottom:"50px"}}>Checkout</button>
            </div>
        </div>
    }

    return(
        <>
        {display}
        </>
    );
}