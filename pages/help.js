import Head from "next/head";
import { useRef, useState } from "react";
import { useUser } from "../utils/useUser";
import { Layout, Input, Menu, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import styles from "../styles/Help.module.css";

export default function Help() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 641 });
  const { userLoaded, userDetails } = useUser();
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const { Search } = Input;
  const style = { background: "#0092ff", padding: "8px 0" };

  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];

  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div>
      <Head>
        <title>Help - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="City of Bounce Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h3>Search Our Help Library</h3>
        <Search
          placeholder="Try something like 'How do I view my upcoming events?''"
          size="large"
        />
        <div className={styles.block}>
          <Sider width={isTabletOrMobile ? "100%" : 280}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ height: "100%" }}
            >
              <SubMenu key="sub1" title="Account & Settings">
                <Menu.Item key="1">Update Account</Menu.Item>
                <Menu.Item key="2">Passwords & Security</Menu.Item>
                <Menu.Item key="3">Events</Menu.Item>
                <Menu.Item key="4">Messages</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title="Finding Products">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="Booking Events">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title="Register & Manage Company">
                <Menu.Item key="13">option9</Menu.Item>
                <Menu.Item key="14">option10</Menu.Item>
                <Menu.Item key="15">option11</Menu.Item>
                <Menu.Item key="16">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <div className={styles.content}>
            <div class={styles.row}>
              <div className={styles.helpButton}>Reset or Forgot Password</div>
              <div className={styles.helpButton}>
                Update account information
              </div>
              <div className={styles.helpButton}>Register my company</div>
              <div className={styles.helpButton}>Manage my company</div>
              <div className={styles.helpButton}>My upcoming events</div>
              <div className={styles.helpButton}>My past events</div>
              <div className={styles.helpButton}>Using messages</div>
              <div className={styles.helpButton}>
                Find products and services
              </div>
              <div className={styles.helpButton}>Refunds and disputes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
