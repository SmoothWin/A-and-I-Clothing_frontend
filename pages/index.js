import Head from 'next/head'
import { NextSeo } from 'next-seo';
import Image from 'next/image'

import styles from '../styles/Home.module.css'

//components
import Navbar from "../components/Navbar";
import Link from "next/link";

import {i18next, useTranslation} from "../utilities/internationalization"

export default function Home() {
  const {t} = useTranslation()
  
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="A&I Clothing"
        description="A clothing as a service company just for you"
        openGraph={{
          title:"A&I Clothing",
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
          {t("home_welcome1")}<a style={{color:"black", fontWeight:"bold", fontFamily:"\"Times New Roman\", Times, serif", textDecorationLine:"underline", textDecorationColor:"red"}}>{t("home_welcome2")}</a>
        </h1>

        <p className={styles.description}>
          {t("home_description1")}<br/><br/>
          {t("home_description2")}<br/>
          <Link href={`/bigorder`}><a>{t("home_description_link")}</a></Link>{t("home_description3")}<br/><br/>
          {t("home_description4")}
        </p>

        <div className={styles.grid}>
          <a href="https://www.linkedin.com/company/a-i-clothing/" className={styles.card}>
            <h2>LinkedIn &rarr;</h2>
            <p>{t("home_socials1")}</p>
          </a>

          <a href="https://www.facebook.com/aiclothingsydd" className={styles.card}>
            <h2>Facebook &rarr;</h2>
            <p>{t("home_socials2")}</p>
          </a>

          <a href="https://www.instagram.com/a_i_clothing/" className={styles.card}>
            <h2>Instagram &rarr;</h2>
            <p>{t("home_socials3")}</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        {t("copyright")}
      </footer>
    </div>
  )
}
