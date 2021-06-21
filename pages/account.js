import Head from 'next/head'
import { useRef, useState } from 'react'
import { useUser } from "../utils/useUser";




export default function Account() {
  const { userLoaded, userDetails } = useUser();

  return (
    <div>
      <Head>
        <title>Account - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="City of Bounce Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
          <h1>Your Account</h1>
          {/* {userDetails.data == undefined?<div>Name</div>:<div>{userDetails.data.full_name} </div>} */}

        </div>
    </div>
  )
}