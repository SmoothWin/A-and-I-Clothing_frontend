import { useEffect, useState } from "react"
import axios from "axios"

//custom imports
import Navbar from "../components/Navbar";
import Link from "next/link";

//custom utility imports
import {returnNumberDecimals} from "../utilities/transformCurrencyString"

//custom api imports
import { addToCart, getCart } from "../api/cart";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";

const productUrl = "http://localhost:8000/v1/products"

export default function Store(){
    const [isMounted, setIsMounted] = useState(false)
    const [data, setData] = useState([])
    const [hasNext, setHasNext] = useState(true)
    const [observer, setObserver] = useState(null)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    async function getData(url, append = false){
        try{
            if(hasNext == false) return
            if(append == false){
                const responseData = await (await axios.get(url, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})).data
                setData(responseData.products)
                if(responseData.has_next)
                    setHasNext(true)
            } else{
                const initialData = data
                const responseData = await (await axios.get(url, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})).data
                setData(initialData.concat(responseData.products))
                if(responseData.has_more){
                    setHasNext(true)
                }
                else{
                    setHasNext(false)
                }
            }


        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        setIsMounted(true)
    })

    useEffect(()=>{
        
        if(isMounted)
            getData(productUrl)
    },[isMounted])

    function addIntersectionObserver(){
        const element = document.getElementById(data[data.length - 1].id)
        let observer = new IntersectionObserver(onIntersection, {
            root: null,   // default is the viewport
            threshold: .6 // percentage of taregt's visible area. Triggers "onIntersection"
          })
          
          // callback is called on intersection change
          function onIntersection(entries, opts){
            entries.forEach(entry => {
              //do get data for rest
              if(entry.isIntersecting){
                    observer.unobserve(element)
                    getData(`${productUrl}/?starting_after=${data[data.length - 1].pricedata.id}-${data[data.length - 1].id}`, true)
                    
                }
            }
            )
          }
          
          // Use the bserver to observe an element
          observer.observe(element)
          return observer
    }

    useEffect(()=>{
        if(hasNext == false)
           observer?.unobserve(document.getElementById(data[data.length - 1].id))
    },[observer])

    useEffect(()=>{
        if(data.length > 0 && hasNext)
            setObserver(addIntersectionObserver())
    },[data])


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

    return(
        <>
            <Head>
                <title>{"Store - A&I Clothing"}</title>
                <BootstrapJS/>
            </Head>
        <Navbar/>
            <br/>
            <h2 className="display-4 col-10 mx-6 text-sm-start"><b>&nbsp;&nbsp;&nbsp;Store</b></h2>
            <br/>
            <br/>
            <br/>
        <center>
            <div className={styles.grid}>
        {data.map(product => 
        <div key={product.id} id={product.id} className={styles.card}>
            <Link href={`/store/${product.pricedata.id}`}><a><img width={250} height={250} src={product.images[0]}/>
            <h2>{product.name}</h2>
            <div>{`$${returnNumberDecimals(product.pricedata.price_string)} ${product.pricedata.currency.toUpperCase()}`}</div>
            <br/></a></Link>
            <button className="btn btn-success" onClick={(e)=>handleItemClick(product)}>Add to cart</button>
        </div>)}
            </div>
    </center>
        </>
    )
}
