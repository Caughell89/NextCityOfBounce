import Head from "next/head";
import { useRef, useState } from "react";
import { useUser } from "./../../utils/useUser";
import moment from "moment";

export default function Account() {
  const { userLoaded, user, session, userDetails, signOut } = useUser();
  console.log(userLoaded);
  console.log(user);
  console.log(userDetails);
  console.log(session);
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
        {userLoaded && (
          <div>
            <div>
              <img src={user.user_metadata.avatar_url} alt="user profile pic" />
              <div>{moment(user.created_at).format("LL")}</div>
            </div>
            <div>{user.user_metadata.full_name}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
          </div>
        )}
      </div>
    </div>
  );
}
