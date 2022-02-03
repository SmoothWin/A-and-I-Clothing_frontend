import axios from "axios";
import url from "../config/config"


const cartAddUrl= `${url}/cart/add`
const cartGetUrl=`${url}/cart/get`

export async function addToCart(){
    try{
       const response = await axios.post(cartAddUrl,{cart:localStorage.getItem("cart")}, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
       localStorage.setItem("cart", response.data.cart_data)
    }catch(e){
        try{
            if((e.response.status == 401 || e.response.status == 403) && localStorage.username){
                await axios.post(`${url}/token`,null,{withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
                const response = await axios.post(cartAddUrl,{cart:localStorage.getItem("cart")}, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
                localStorage.setItem("cart", response.data.cart_data)
            }
        }catch(e){
            
        }
    }
}

export async function getCart(){
    try{
        const response = await axios.post(cartGetUrl,null, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
        localStorage.setItem("cart", response.data.shopping_cart.cart_data)
        
    }catch(e){
        throw new Error("Cart tracking N/A")
    }
}


