import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { useUser } from "../../utils/useUser";
import { supabase } from "../../utils/supabaseClient";
import moment from "moment";

export default function CompanyManager() {
  const { userLoaded, userDetails } = useUser();
  const [company, setCompany] = useState({});

  const getCompany = async () => {
    if (userLoaded) {
      console.log(userDetails.data.id);
      const { data, error } = await supabase
        .from("employees")
        .select("company_id")
        .eq("user_id", userDetails.data.id);
      if (data) {
        console.log("We need to get a company");
        const response = await supabase
          .from("companies")
          .select()
          .eq("id", data[0].company_id);
        console.log(response.data);
        setCompany(response.data[0]);
      }
      console.log(data);
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div>
      <Head>
        <title>
          {company === null ? "" : company.name + " | "}Company Manager
        </title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="City of Bounce Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h1>Manage your company</h1>
        {company === null ? (
          <div>Loading</div>
        ) : (
          <>
            <h2>{company.name}</h2>
            <div className="f12">
              Shop Opened {moment(company.created_at).format("LL")}
            </div>
            <div>{company.location}</div>
          </>
        )}
      </div>
    </div>
  );
}
