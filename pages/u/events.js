import Head from "next/head";
import { useRef, useState } from "react";
import { useUser } from "../../utils/useUser";
import { Menu } from "antd";
import { CalendarOutlined, HistoryOutlined } from "@ant-design/icons";

export default function Messages() {
  const { userLoaded, userDetails } = useUser();
  const [current, setCurrent] = useState("upcoming");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Head>
        <title>Events - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="City of Bounce Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h1>Your Events</h1>
        {/* {userDetails.data == undefined?<div>Name</div>:<div>{userDetails.data.full_name} </div>} */}
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="mb2">
          <Menu.Item key="upcoming" icon={<CalendarOutlined />}>
            Upcoming
          </Menu.Item>
          <Menu.Item key="past"  icon={<HistoryOutlined />}>
            Previous
          </Menu.Item>
        </Menu>
        {current === "upcoming" ? (
          <div>
            <div>
              You need to display a list of events that are upcoming in the
              future maybe have search and filter and sort capabilities
            </div>
          </div>
        ) : (
          <div>
            <div>List Previous events maybe list sort filter options</div>
          </div>
        )}
      </div>
    </div>
  );
}
