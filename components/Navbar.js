import Link from 'next/link'

export default function Navbar(){
    return(
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                    <Link href="/"><a className="navbar-brand" style={{color:"black", fontWeight:"bold", fontFamily:"\"Times New Roman\", Times, serif", textDecorationLine:"underline", textDecorationColor:"red"}}>A & I Clothing</a></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link href="/bigorder"><a className="nav-link">Big Order</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/store"><a className="nav-link">Store</a></Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link href="/register"><a className="nav-link">Register</a></Link>
                            <Link href="/login"><a className="nav-link">Login</a></Link>

                        </form>
                    </div>
                </div>
            </nav>
    )
}