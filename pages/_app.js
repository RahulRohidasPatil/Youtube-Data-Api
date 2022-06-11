import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  //fetching the latest videos with interval of 10 minutes
  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:3000/api/storevideos");
    }, 10 * 60 * 1000);
  }, []);
  
  return <Component {...pageProps} />
}

export default MyApp
