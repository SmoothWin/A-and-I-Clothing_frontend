import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  })
  useEffect(()=>{
    if(isMounted){
    let originalSetItem = localStorage.setItem;

    localStorage.setItem = function(key, value) {
          const event = new Event('itemInserted');

          event.value = value; // Optional..
          event.key = key; // Optional..

          originalSetItem.apply(this, arguments);
          document.dispatchEvent(event);

        };
    }
  }, [isMounted])
  return <Component {...pageProps} />
}

export default MyApp
