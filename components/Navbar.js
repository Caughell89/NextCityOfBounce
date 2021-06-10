import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import Backdrop from "./Backdrop";
import Signup from "./Signup";
import NavSearch from "./NavSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Navbar.module.css";
import { useState, useContext } from "react";
import { UserContext } from "./../context/UserContext";
import { Drawer, Modal, Menu } from 'antd';

import { motion } from "framer-motion";

const Navbar = () => {
  const [loginModalOpen, showLogin] = useState(false);
  const [signupModalOpen, showSignup] = useState(false);
  const [navSearch, setNavSearch] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);

  

  const handleOk = () => {
    alert("Ok Clicked");
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

  const { status, user, location, date } = useContext(UserContext);
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
      <Menu.Item key="messages">
        <Link href="/messages">Messages</Link>
      </Menu.Item>
      <Menu.Item key="events">
        <Link href="/events">Events</Link>
      </Menu.Item>
      <Menu.Item key="account">
        <Link href="/account">Account</Link>
      </Menu.Item>
      <Menu.Item key="company">
        <Link href="/company_manager">Manage Company</Link>
      </Menu.Item>
      <Menu.Item key="admin">
        <Link href="/admin">Admin</Link>
      </Menu.Item>
      <Menu.Item key="help">
        <div>Help</div>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => status.logout()}>
        <div>Logout</div>
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
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </div>
          )}
          <div className={styles.navLinks}>
            {status.loggedIn && user.userDetails.company === null && (
              <Link href="Register Company">
                <div className={styles.navItem}>
                  <span className={styles.navItemText}>Register Company</span>
                </div>
              </Link>
            )}
            {!status.loggedIn && (
              
               
                <div
                  onClick={() => {
                    showLogin(false), showSignup(true);
                  }}
                  className={styles.navItem}
                >
                  <span className={styles.navItemText}>Register Company</span>
                </div>
            
            )}
            {status.loggedIn ? (
              <>
                <div className={styles.userBtn}>
                  <span>
                    <div>
                      <img
                        src={user.userDetails.imageUrl}
                        alt="User's profile pic"
                      />
                      <span className={styles.navName}>
                        {user.userDetails.firstName}
                      </span>
                    </div>
                  </span>
                </div>
                
              </>
            ) : (
              <>
                <div
                  onClick={() => {
                    showLogin(false), showSignup(true);
                  }}
                  className={styles.navItem}
                >
                  <span className={styles.navItemText}>Sign Up</span>
                </div>
                <div
                  onClick={() => {
                    showLogin(true), showSignup(false);
                  }}
                  className={styles.navItem}
                >
                  <span className={styles.navItemText}>Login</span>
                </div>
              </>
            )}
            <Link href="/cart">
              <a className={styles.cartLink}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </Link>
            <div onClick={showSideMenu} className={styles.menuToggler}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          {/* <div className={styles.flexCenter}>
            <div onClick={showSideMenu} className={styles.navUserBtnMobile}>
              <img src={user.userDetails.imageUrl} alt="User's profile pic" />
            </div>
           
          </div> */}
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
        <Login showSignup={signupModalOpen} />
      </Modal>
      <Modal
        centered
        title={null}
        visible={signupModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Signup showLogin={loginModalOpen} />
      </Modal>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        visible={sideMenu}
        key="Side Menu"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer> 
    </>
  );
};

export default Navbar;
