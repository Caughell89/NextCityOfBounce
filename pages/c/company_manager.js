import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { useUser } from "../../utils/useUser";
import { supabase } from "../../utils/supabaseClient";
import moment from "moment";
import { Menu } from "antd";
import {
  CalendarOutlined,
  HistoryOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export default function CompanyManager() {
  const { userLoaded, userDetails } = useUser();
  const [company, setCompany] = useState({});
  const [current, setCurrent] = useState("upcoming");

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
  const handleClick = (e) => {
    setCurrent(e.key);
  };
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
        <h2>Manage your company</h2>
        {company === null ? (
          <div>Loading</div>
        ) : (
          <>
            <h2>{company.name}</h2>
            <div className="f12">
              Shop Opened {moment(company.created_at).format("LL")}
            </div>
            <div>{company.location}</div>
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode="horizontal"
              className="mb2"
            >
              <Menu.Item key="upcoming" icon={<CalendarOutlined />}>
                Upcoming Orders
              </Menu.Item>
              <Menu.Item key="past" icon={<HistoryOutlined />}>
                Previous Orders
              </Menu.Item>
              <Menu.Item key="areas" icon={<HistoryOutlined />}>
                Areas
              </Menu.Item>
              <Menu.Item key="employees" icon={<TeamOutlined />}>
                Employees
              </Menu.Item>
              <Menu.Item key="products" icon={<HistoryOutlined />}>
                Products
              </Menu.Item>
            </Menu>
            <>
              {current === "upcoming" && (
                <div>Show upcoming orders and the ablity to search</div>
              )}
              {current === "past" && (
                <div>Show past orders and the ablity to search</div>
              )}
              {current === "areas" && (
                <div>Show service areas ability to edit and add</div>
              )}
              {current === "employees" && (
                <div>Show employees show ablity to edit and add</div>
              )}
            </>
          </>
        )}
      </div>
    </div>
  );
}
