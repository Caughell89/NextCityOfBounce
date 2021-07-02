import Head from "next/head";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AutoComplete from "../components/Autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import moment from "moment";

export default function Cart() {
  const [items, setItems] = useState([]);

  return (
    <div>
      <Head>
        <title>Shopping Cart - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta
          name="description"
          content="Your cart - Party Rentals | Bounce Houses | Tents - City of Bounce"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h1 className="mb4">Shopping Cart</h1>
        <div>
          {items.length < 1 ? (
              <div className="box">
              <h4 className="mb3">
                Wait a minute your cart is empty go check out some party rentals to make
                your event memorable!
              </h4>
              <Link  href="/">
               
                <div className="bounceButton mb2">Search</div>
                
              </Link>
              </div>
          ) : (
            <div>items</div>
          )}
        </div>
      </div>
    </div>
  );
}
