import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import Backdrop from "./Backdrop";
import Signup from "./Signup";
import NavSearch from "./NavSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Navbar.module.css";
import { useState, useContext } from "react";
import { UserContext } from "./../context/UserContext";
import { useUser } from "../utils/useUser";

import { Drawer, Modal, Menu, Dropdown, Badge } from "antd";
import {
  LoginOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  CommentOutlined,
  CalendarOutlined,
  DesktopOutlined,
  SolutionOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { motion } from "framer-motion";

const Navbar = (...pageProps) => {
  const { userLoaded, user, session, userDetails, signOut } = useUser();
  console.log(userLoaded);
  console.log(user);
  console.log(userDetails);
  console.log(session);
  const [loginModalOpen, showLogin] = useState(false);
  const [signupModalOpen, showSignup] = useState(false);
  const [navSearch, setNavSearch] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  console.log(pageProps);
  const handleOk = () => {
    alert("Ok Clicked");
  };

  const openLoginModal = () => {
    showLogin(true);
    showSignup(false);
  };

  const openSignUpModal = () => {
    showLogin(false);
    showSignup(true);
  };

  const showSideMenu = () => {
    setSideMenu(true);
  };

  const onClose = () => {
    setSideMenu(false);
  };

  const handleCancel = () => {
    showSignup(false);
    showLogin(false);
  };

  const launchSearch = () => {
    setNavSearch(true);
  };

  const { status, location, date } = useContext(UserContext);
  console.log(status);
  console.log(user);
  const defaultState = {
    opacity: 0,
    scale: 0.6,
    y: -100,
  };

  const searchVars = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      y: -100,
      transition: {
        type: "spring",
        mass: 0.5,
        delay: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 20,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.5,
        delay: 0.2,
      },
    },
  };

  const menu = (
    <Menu>
      <Menu.Item key="messages" icon={<CommentOutlined />}>
        <Link href="/u/messages">Messages</Link>
      </Menu.Item>
      <Menu.Item key="events" icon={<CalendarOutlined />}>
        <Link href="/u/events">Events</Link>
      </Menu.Item>
      <Menu.Item key="account" icon={<UserOutlined />}>
        <Link href="/u/account">Account</Link>
      </Menu.Item>
      <Menu.Item key="company" icon={<DesktopOutlined />}>
        <Link href="/company_manager">Manage Company</Link>
      </Menu.Item>
      <Menu.Item key="admin" icon={<SolutionOutlined />}>
        <Link href="/admin">Admin</Link>
      </Menu.Item>
      <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
        <Link href="/help">Help</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => signOut()}
        icon={<LogoutOutlined />}
      >
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className={styles.navHolder}>
        <nav className={styles.nav}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.7,
                },
              },
            }}
          >
            <Link href="/">
              <a>
                <div className={styles.logoText}>
                  <Image
                    src="/LogoTealText.png"
                    height="45"
                    width="92"
                    alt="City of bounce logo"
                  />
                </div>
                <div className={styles.logo}>
                  <Image
                    src="/LogoTeal.png"
                    height="45"
                    width="24"
                    alt="City of bounce logo"
                  />
                </div>
              </a>
            </Link>
          </motion.div>
          {!navSearch && (
            <div onClick={launchSearch} className={styles.search}>
              <div className={styles.location}>
                {location === "" ? (
                  <span className={styles.blank}>Add location</span>
                ) : (
                  <span className={styles.complete}>{location}</span>
                )}
              </div>
              <div className={styles.date}>
                {date === "" || date === "all" ? (
                  <span className={styles.blank}>Add date</span>
                ) : (
                  <span className={styles.complete}>{date}</span>
                )}
              </div>
              <div className={styles.searchBtn}>
                <span>
                  <SearchOutlined className={styles.flexCenter} />
                </span>
              </div>
            </div>
          )}
          <div className={styles.navLinks}>
            {userLoaded && (
              <Link href="/company_registration">
                <motion.a
                  initial={{ borderBottom: "2px solid rgb(255, 255, 255)" }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{
                    scale: 1.1,
                    color: "rgb(28, 172, 200)",
                    borderBottom: "2px solid rgb(28, 172, 200)",
                  }}
                  className={styles.navItem}
                >
                  <span className={styles.navItemText}>Register Company</span>
                </motion.a>
              </Link>
            )}
            {!userLoaded && (
              <motion.div
                initial={{ borderBottom: "2px solid rgb(255, 255, 255)" }}
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1.1,
                  color: "rgb(28, 172, 200)",
                  borderBottom: "2px solid rgb(28, 172, 200)",
                }}
                onClick={() => {
                  showLogin(false), showSignup(true);
                }}
                className={styles.navItem}
              >
                <span className={styles.navItemText}>Register Company</span>
              </motion.div>
            )}
            {userLoaded ? (
              <div>
                <Dropdown
                  className={styles.userDrop}
                  trigger={["click"]}
                  overlay={menu}
                  placement="bottomRight"
                >
                  <div className={styles.userBtn}>
                    <span>
                      <div>
                        {userDetails.data == undefined ? (
                          <>
                            <img
                              src="https://res.cloudinary.com/city-of-bounce/image/upload/v1557940124/no-profile-pic.png"
                              alt="User's profile pic"
                            />{" "}
                            <span className={styles.navName}>Name</span>
                          </>
                        ) : (
                          <>
                            <img
                              src={userDetails.data.avatar_url}
                              alt="User's profile pic"
                            />
                            <span className={styles.navName}>
                              {userDetails.data.full_name.split(" ")[0]}
                            </span>
                          </>
                        )}
                      </div>
                    </span>
                  </div>
                </Dropdown>
                <div onClick={showSideMenu} className={styles.navUserBtnMobile}>
                  {userDetails.data == undefined ? (
                    <img
                      src="https://res.cloudinary.com/city-of-bounce/image/upload/v1557940124/no-profile-pic.png"
                      alt="User's profile pic"
                    />
                  ) : (
                    <img
                      src={userDetails.data.avatar_url}
                      alt="User's profile pic"
                    />
                  )}
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ borderBottom: "2px solid rgb(255, 255, 255)" }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{
                    scale: 1.1,
                    color: "rgb(28, 172, 200)",
                    borderBottom: "2px solid rgb(28, 172, 200)",
                  }}
                  onClick={openSignUpModal}
                  className={styles.navItem}
                >
                  <span className={styles.navItemText}>Sign Up</span>
                </motion.div>
                <motion.div
                  initial={{ borderBottom: "2px solid rgb(255, 255, 255)" }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{
                    scale: 1.1,
                    color: "rgb(28, 172, 200)",
                    borderBottom: "2px solid rgb(28, 172, 200)",
                  }}
                  onClick={openLoginModal}
                  className={styles.navItem}
                >
                  <span className={styles.navItemText}>Login</span>
                </motion.div>
              </>
            )}
            <Link href="/cart">
              <div>
                <a className={styles.cartLink}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </a>
              </div>
            </Link>
            {!userLoaded && (
              <div onClick={showSideMenu} className={styles.menuToggler}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            )}
          </div>
        </nav>

        <NavSearch navSearch={navSearch} close={setNavSearch} />
        {navSearch && (
          <Backdrop click={() => setNavSearch(false)} style="clear-backdrop" />
        )}
      </div>

      <Modal
        centered
        title={null}
        visible={loginModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Login showSignup={openSignUpModal} />
      </Modal>
      <Modal
        centered
        title={null}
        visible={signupModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Signup showLogin={openLoginModal} />
      </Modal>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        visible={sideMenu}
        key="Side Menu"
      >
        <div className={styles.sideMenu}>
          {userLoaded ? (
            <div className={styles.sideMenuU}>
              <div>
                <Link onClick={() => setSideMenu(false)} href="/u/account">
                  <a onClick={() => setSideMenu(false)}>
                    {userDetails.data == undefined ? (
                      <>
                        <span className={styles.sideMenuImg}>
                          <img
                            src="https://res.cloudinary.com/city-of-bounce/image/upload/v1557940124/no-profile-pic.png"
                            alt="User's profile pic"
                          />
                        </span>
                        <div className={styles.sideMenuName}>Name</div>
                      </>
                    ) : (
                      <>
                        <span className={styles.sideMenuImg}>
                          <img
                            src={userDetails.data.avatar_url}
                            alt="User's profile pic"
                          />
                        </span>
                        <div className={styles.sideMenuName}>
                          {userDetails.data.full_name}
                        </div>
                      </>
                    )}
                  </a>
                </Link>
                <Link onClick={() => setSideMenu(false)} href="/u/account">
                  <a>
                    <div
                      className="mb1 pointer"
                      onClick={() => setSideMenu(false)}
                    >
                      <UserOutlined className="mr1" />
                      Account
                    </div>
                  </a>
                </Link>
                <Link onClick={() => setSideMenu(false)} href="/u/messages">
                  <a>
                    <div
                      className="mb1 pointer"
                      onClick={() => setSideMenu(false)}
                    >
                      <CommentOutlined className="mr1" />
                      Messages
                    </div>
                  </a>
                </Link>
                <Link onClick={() => setSideMenu(false)} href="/u/events">
                  <a>
                    <div
                      onClick={() => setSideMenu(false)}
                      className="mb1 pointer"
                    >
                      <CalendarOutlined className="mr1" />
                      Events
                    </div>
                  </a>
                </Link>
                <div className="mb1 pointer">
                  <Link href="/cart">
                    <a onClick={() => setSideMenu(false)}>
                      <DesktopOutlined className="mr1" />
                      Manage Company
                    </a>
                  </Link>
                </div>
                <div className="mb1">
                  <SolutionOutlined className="mr1" />
                  Admin
                </div>
              </div>
              <div className={styles.sideMenuFooter}>
                <div className="mb1">
                  <Link href="/help">
                    <a onClick={() => setSideMenu(false)}>
                      <QuestionCircleOutlined className="mr1" />
                      Help
                    </a>
                  </Link>
                </div>
                <div onClick={() => signOut()}>
                  <LogoutOutlined className="mr1" />
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.sideMenuU}>
              <div className="mt2">
                <div
                  className={styles.sideMenuItem}
                  onClick={() => {
                    showLogin(false), showSignup(true), onClose;
                  }}
                >
                  <FormOutlined className="mr1" />
                  Sign up
                </div>
                <div
                  className={styles.sideMenuItem}
                  onClick={() => {
                    showLogin(true), showSignup(false), onClose;
                  }}
                >
                  <LoginOutlined className="mr1" />
                  Login
                </div>
              </div>
              <div className={styles.sideMenuFooter}>
                <div className="mb1">
                  <Link href="/help">
                    <a onClick={() => setSideMenu(false)}>
                      <QuestionCircleOutlined className="mr1" />
                      Help
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
