import Head from 'next/head'
import { NextSeo } from 'next-seo';
import Image from 'next/image'

import styles from '../styles/Home.module.css'

//components
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {

  
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="A&I Clothing"
        description="A clothing as a service company just for you"
        openGraph={{
          images:[
            {
              url:"/image.png",
              width:478,
              height:394,
              alt:"Red T-shirt being produced"
            }
          ]
        }}
      />
  <Navbar/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a style={{color:"black", fontWeight:"bold", fontFamily:"\"Times New Roman\", Times, serif", textDecorationLine:"underline", textDecorationColor:"red"}}>A & I Clothing</a>
        </h1>

        <p className={styles.description}>
          A small family-owned business that has only the goal of providing the best quality of clothing they can offer to their client.
          Going away from nowadays capitalist profit-looking economy, A & I Clothing is trying to offer the best price they can.<br/><br/>
          Offering clothing solutions for businesses, schools and events off all sizes.<br/>
          <Link href={`/bigorder`}><a>Contact us</a></Link> to submit your request!<br/><br/>
          Your needs are our priorities.
        </p>

        <div className={styles.grid}>
          <a href="https://www.linkedin.com/company/a-i-clothing/" className={styles.card}>
            <h2>LinkedIn &rarr;</h2>
            <p>Follow our company on the best business network</p>
          </a>

          <a href="https://www.facebook.com/aiclothingsydd" className={styles.card}>
            <h2>Facebook &rarr;</h2>
            <p>Follow us on the largest social network</p>
          </a>

          <a href="https://www.instagram.com/a_i_clothing/" className={styles.card}>
            <h2>Instagram &rarr;</h2>
            <p>Follow our journey as a small business</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Copyright © A & I Clothing G.P.
      </footer>
    </div>
  )
}
