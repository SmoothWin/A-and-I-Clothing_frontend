import Head from "next/head";
import BootstrapJS from "../components/Bootstrap";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function store(){
    return(
        <div className={styles.container}>
            <Head>
                <title>{"Store - A&I Clothing"}</title>
                <BootstrapJS/>
            </Head>
            <Navbar/>
            <br/>
            <br/>
            <div className="container-sm">
                <div className="d-flex flex-column flex-md-row">
                    <div className="col-12 col-md-6 mx-1">
                        <h2 className="display-4 col-10 mx-6 text-sm-start">Store</h2>
                    </div>
                </div>
                {items && items.map(item =>
                    <tr key={item.id}>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                    </tr>
                )}
            </div>
            </div>)}