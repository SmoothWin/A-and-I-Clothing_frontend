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
    const [selectedSize, setSelectedSize] = useState({})
    const [exists, setExists] = useState(true)

    useEffect(()=>{
        setIsMounted(true)
    })

    useEffect(()=>{
        if(!productId) return
        async function getData(){
            try{
                const responseData = await (await axios.get(`http://localhost:8000/v1/products/${productId}`, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})).data
                // console.log(responseData)
                setProduct(responseData)
            }catch(e){
                console.log(e)
                setExists(false)
            }
        }
        if(isMounted)
            getData()
    },[isMounted,productId])

    useEffect(()=>{
        if(product == null)
            return
        const selectedSizes = {}
        
            let prodId = product.id
            let selectedSize = Object.entries(product.metadata).filter(x=>x[0].includes("_quantity")&& x[1]>0)[0]

            selectedSizes[prodId]=selectedSize[0]
            // console.log(selectedSizes)
        setSelectedSize(selectedSizes)
    }, [product])


    async function handleItemClick(item){
        try{
            try{
                await getCart()
            }catch(e){
                
            }
            if(!localStorage.cart)
            localStorage.cart = JSON.stringify({"items":[]})
            const list = JSON.parse(localStorage?.cart)
            
            if(list.items.some(product=>item.id == product.id)){
                list.items.forEach(product => {
                    if(product.id == item.id){
                        product.quantity += 1
                        if(typeof product[selectedSize[item.id]] == "undefined")
                            product[selectedSize[item.id]] = 1
                        else
                            product[selectedSize[item.id]] += 1
                    }
                });
            } else{
                list.items.push(item)
                list.items.forEach(product => {
                    if(product.id == item.id){
                        product.quantity = 1
                        if(typeof Object.keys(product).find(x=>x.includes("_quantity")) != "undefined")
                            

                        delete product[Object.keys(product).find(x=>x.includes("_quantity"))]
                        // console.log(Object.keys(item))
                        product[selectedSize[item.id]] = 1
                        // console.log(item[selectedSize[product.id]])
                    }
                });
            }
            localStorage.setItem("cart", JSON.stringify(list))
            await addToCart()
        }catch(e){
            console.log(e)
        }
    }

    function handleItemSelection(e,item){
        const selectedSizeModified = selectedSize
        console.log(selectedSizeModified)

        selectedSizeModified[item.id] = e.target.value
        console.log(selectedSizeModified)

        setSelectedSize(selectedSizeModified)

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
            <span>{`$${returnNumberDecimals(item?.pricedata.price_string)} ${item?.pricedata.currency.toUpperCase()}`}</span>
            <div>{item?.description}</div>
            <select onChange={(e)=>handleItemSelection(e,item)}>
                {Object.entries(item.metadata)?.filter(x=>x[0].includes("_quantity") && x[1] > 0).map(x=>
                <option value={x[0]} key={x[0]}>
                    {x[0].replace("_quantity","")}
                </option>)}
            </select>
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