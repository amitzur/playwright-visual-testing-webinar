import * as React from "react"
import Link from "next/link"
import { StoreContext } from "../../context/store-context"
import {
    header,
    container,
    searchButton,
    logo as logoCss,
} from "./header.module.css"
import Logo from "./logo"
import Navigation from "./Navigation"
import { CartButton } from "../Cart/cart-button"
import { Toast } from "../Cart/toast"
import { AdminContext } from "../../context/admin-context";
import SearchIcon from "../Search/search"

export function Header() {
    const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)
    const {showIcon} = React.useContext(AdminContext);
    
    const items = checkout ? checkout.lineItems : [];
    
    const quantity = items?.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    return (
        <div className={container}>
            <header className={header}>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <Link href="/e-commerce" className={logoCss}>
                        <Logo />
                    </Link>
                    <Navigation />
                </div>
                <div style={{display: "flex"}}>
					{/* TODO: Fix search bug with Shopify */}
                    {/* <Link href="/e-commerce/search" className={searchButton}>
                        <SearchIcon />
                    </Link> */}
					{console.log(showIcon)}
                    {showIcon ? <Link href="/e-commerce/search" className={searchButton}>
                        <SearchIcon />
                    </Link> : ''}
                    <CartButton quantity={quantity} />
                </div>
                
            </header>
            <Toast show={loading || didJustAddToCart}>
                {!didJustAddToCart ? (
                        "Updating…"
                ) : (
                    <>
                        Added to cart{" "}
                        <svg
                            width="14"
                            height="14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                                fill="#fff"
                            />
                            <path
                                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                                fill="#fff"
                            />
                            <path
                                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                                fill="#fff"
                            />
                        </svg>
                    </>
                )}
            </Toast>
        </div>
    )
}
            
