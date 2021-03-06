import Head from "next/head";
import { useState } from "react";
import CompanyForm from "../components/CompanyForm";
export default function RegisterCompany() {
  // const { userLoaded, user, userDetails, session } = useUser();
  // // const router = useRouter();

  // console.log(session);
  // console.log(userLoaded);
  // console.log(user);
  // console.log(userDetails);

  return (
    <div>
      <Head>
        <title>Company Registration - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h1>Company Registration</h1>

        <CompanyForm />
      </div>
    </div>
  );
}
