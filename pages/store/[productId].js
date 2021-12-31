import { useEffect, useState } from "react"
import axios from "axios"

//custom imports
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";

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
                const responseData = await (await axios.get(`http://localhost:8000/v1/products/${productId}`, {withCredentials:true})).data
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


    function handleItemClick(product){
        try{
            if(!localStorage.cart)
            localStorage.cart = JSON.stringify({"items":[]})
            const list = JSON.parse(localStorage?.cart)
            list.items.push(product)
            localStorage.setItem("cart", JSON.stringify(list))
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
            <h2>{item?.name}</h2> 
            {(item.images[0])?<img width={600} src={item?.images[0]}/>:null}
            <div>{item?.description}</div>
            <button className="btn btn-success" onClick={(e)=>handleItemClick(item)}>Add to cart</button>
        </div>
    }

    
    if(exists == false)
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