import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Success(){
    const router = useRouter()
    const {id} = router.query
    const [mounted, setMounted] = useState(false)
    const [session, setSession] = useState(null)

    useEffect(()=>{
        setMounted(true)
    })

    useEffect(()=>{
        console.log(mounted)
        async function getSession(id){
            try{
            const response = await axios.get(`http://localhost:8000/checkout/session?id=${id}`, {withCredentials:true, headers:{"csrf-token":localStorage._csrf}})
            const data = await response.data
            setSession(data)
            }catch(e){
                console.log(e)
            }
        } 
        if(mounted)
            getSession(id)
            
    },[id])

    let sessionObj = null
    if(session != null)
        sessionObj = session

    return (
        <pre style={{height:"100px"}}>{JSON.stringify(sessionObj)}</pre>
    )
}