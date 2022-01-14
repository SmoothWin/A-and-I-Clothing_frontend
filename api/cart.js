import axios from "axios";


const cartAddUrl= "http://localhost:8000/cart/add"
const cartGetUrl="http://localhost:8000/cart/get"

export async function addToCart(){
    try{
       const response = await axios.post(cartAddUrl,{cart:localStorage.getItem("cart")}, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
       localStorage.setItem("cart", response.data.cart_data)
    }catch(e){
        if(e.response.status == 401 || e.response.status == 403){
            await axios.post("http://localhost:8000/token",null,{withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
            const response = await axios.post(cartAddUrl,{cart:localStorage.getItem("cart")}, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
            localStorage.setItem("cart", response.data.cart_data)
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


