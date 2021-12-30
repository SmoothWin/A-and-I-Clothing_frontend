import { useEffect, useState } from "react"
import axios from "axios"

//custom imports
import Navbar from "../components/Navbar";
import Link from "next/link";

const productUrl = "http://localhost:8000/v1/products"

export default function Store(){
    const [isMounted, setIsMounted] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
        setIsMounted(true)
    })

    useEffect(()=>{
        async function getData(){
            try{
                const responseData = await (await axios.get(productUrl, {withCredentials:true})).data
                console.log(responseData)
                setData(responseData.products)
            }catch(e){
                console.log(e)
            }
        }
        if(isMounted)
            getData()
    },[isMounted])


    function handleItemClick(product){
        try{
            if(!localStorage.cart)
            localStorage.cart = JSON.stringify({"items":[]})
            const list = JSON.parse(localStorage?.cart)
            list.items.push(product)
            localStorage.cart = JSON.stringify(list)
        }catch(e){
            console.log(e)
        }
    }

    return(
    <>
        <Navbar/>
        {data.map(product => 
        <div key={product.id}>
            <h2>{product.name}</h2> 
            <Link href={`/store/${product.id}`}><a><img width={300} src={product.images[0]}/></a></Link>
            <br/>
            <button className="btn btn-success" onClick={(e)=>handleItemClick(product)}>Add to cart</button>
        </div>)}
    </>
    )
}