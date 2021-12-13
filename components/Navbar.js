import Link from 'next/link'

export default function Navbar(){
    return(
        <nav>
            <h2>Bruh</h2>
            <Link href="/"><a>Home</a></Link>
            <Link href="/bigorder"><a>Big Order</a></Link>
        </nav>
    );
}