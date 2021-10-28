import Head from "next/head";
import { useRef, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { DatePicker } from "antd";

import styles from "../styles/Home.module.css";
import { UserContext } from "./../context/UserContext";
import AutoComplete from "../components/Autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";

import moment from "moment";

export default function Home() {
  const { setParty } = useContext(UserContext);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const locationInput = useRef();
  const handleBookClick = () => {
    document.getElementById("location-value").focus();
  };
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  return (
    <div>
      <Head>
        <title>Party Rentals | Bounce Houses | Tents - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="Generated by create next app" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/city-of-bounce/image/upload/v1604618932/EmailBanner.png"
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/facicon-128.icpng" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-apple-touch-32.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="114x114"
          href="/favicon-apple-touch-114.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="144x144"
          href="/favicon-apple-touch-122.png"
        />
        <link rel="icon" href="/logo192.png" />
        <link rel="icon" href="/logo512.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id={styles.content}>
        <div
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/city-of-bounce/image/upload/v1601314977/HomePage1_mftm4x.jpg",
          }}
          className={styles.background}
        >
          <div className={styles.inputCard}>
            <div className={styles.welcome}>
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
                      delay: 0.5,
                    },
                  },
                }}
              >
                <h1 className={styles.welcomeHeader}>LET'S THROW A PARTY!</h1>
              </motion.div>
              <h3 className={styles.welcomeDescription}>
                Rent tents, bounce houses, and other party essentials from local
                companies.
              </h3>
            </div>

            <div id={styles.partyInputForm}>
              <div className={styles.partyInput}>
                <label htmlFor="location">WHERE</label>
                <AutoComplete
                  ref={locationInput}
                  name="location"
                  id="location-value"
                  look="form-control"
                  placeholder="Where is your party?"
                  noneFound="No companies serving this area"
                  onUpdate={setLocation}
                />
              </div>
              <div className={styles.partyInput}>
                <div className="row">
                  <div className="full-col">
                    <label className="bold" htmlFor="date">
                      DATE
                    </label>
                  </div>
                </div>

                <DatePicker
                  format={"MM/DD/YYYY"}
                  size="large"
                  inputReadOnly={true}
                  className={styles.date}
                  disabledDate={disabledDate}
                  onChange={(date, dateString) => setDate(date)}
                />
              </div>
              <motion.div className={styles.flex} whileTap={{ scale: 0.9 }}>
                <button
                  onClick={() => {
                    setParty(location, date);
                  }}
                  className={styles.bounceButton}
                  id={styles.searchButton}
                >
                  Search
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={styles.articlesHeader}>Party Planning Ideas</h2>
          <div className={styles.articles}>
            <div className="">
              <Link href="party_ideas/Unique-Night-Events">
                <div className={styles.articleHolder}>
                  <img
                    src="https://archzine.com/wp-content/uploads/2019/06/outdoor-movie-night-teen-birthday-party-ideas-throw-pillows-fairy-lights.jpg"
                    alt="Article pic"
                  />
                  <div className={styles.articlePreviewText}>
                    Unique Night Events
                  </div>
                </div>
              </Link>
              <Link href="party_ideas/Simple-Touches">
                <div className={styles.articleHolder}>
                  <img
                    src="http://www.weddingtentsale.com/wp-content/uploads/2017/02/shelter-party-tent-luxury-wedding-tent-social-event-tent-sports-cover-dome-geodisic-22.jpg"
                    alt="Article pic"
                  />
                  <div className={styles.articlePreviewText}>
                    Simple Touches
                  </div>
                </div>
              </Link>
              <Link href="party_ideas/Lighting-Ideas">
                <div className={styles.articleHolder}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXm0ZrSYCZq4kLQDttaDZhf-J6w0EhLkd15U580prIauPa2XBDmA&s"
                    alt="Article pic"
                  />
                  <div className={styles.articlePreviewText}>
                    Lighting Ideas
                  </div>
                </div>
              </Link>
              <Link href="party_ideas/Safety-&-Monitoring">
                <div className={styles.articleHolder}>
                  <img
                    src="https://tooelecity.org/wp-content/uploads/2015/03/Bounce-House-2.jpg"
                    alt="Article pic"
                  />
                  <div className={styles.articlePreviewText}>
                    Safety & Monitoring
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/city-of-bounce/image/upload/v1603726421/bpt_6_24_45_emftjl.jpg)",
            }}
            className={styles.homeFooter}
          >
            <div className={styles.footerContent}>
              <div className={styles.footerTextHolder}>
                <h3 className={styles.whiteText}>CITY OF BOUNCE PARTIES</h3>
                <h4 className={styles.blueText}>
                  Because throwing a party should be fun
                </h4>
                <div className={styles.whiteText}>
                  One-of-a-kind events supplied by local businesses, for people
                  looking to have a good time.
                </div>
                <div onClick={handleBookClick} className={styles.book}>
                  Book an event{" "}
                  <FontAwesomeIcon
                    className={styles.bookIcon}
                    icon={faChevronRight}
                    size={"lg"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
