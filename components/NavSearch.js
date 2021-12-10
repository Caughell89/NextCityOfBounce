import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import styles from "../styles/NavSearch.module.css";
import Autocomplete from "./Autocomplete";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { UserContext } from "./../context/UserContext";
import { DatePicker, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const searchVars = {
  hidden: {
    opacity: 0,
    scale: 0.2,
    y: -60,
    transition: {
      type: "spring",
      mass: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 20,
    scale: 1,
    transition: {
      type: "spring",
      mass: 0.5,
    },
  },
};

const NavSearch = ({ navSearch, close }) => {
  const { setParty } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [loc, setLoc] = useState("");
  const [date, setDate] = useState(null);
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const onUpdate = (res) => {
    setLoc(res);
  };

  const saveLoc = () => setStep(2);

  const back = () => setStep(1);

  const isTabletOrMobile = useMediaQuery({ maxWidth: 641 });

  return (
    <AnimatePresence exitBeforeEnter>
      {navSearch && (
        <motion.div
          variants={searchVars}
          initial="hidden"
          exit="hidden"
          animate="visible"
        >
          {isTabletOrMobile ? (
            <div className={styles.fullWrap}>
              <div className={styles.fullScreen}>
                <div>
                  <div className={styles.mobileSearchNav}>
                    {step === 1 && (
                      <LeftOutlined onClick={() => close(false)} />
                    )}
                    {step === 2 && <LeftOutlined onClick={back} />}
                  </div>
                  <div className={styles.mobileSearch}>
                    {step === 1 && (
                      <div className={styles.location}>
                        <span>Location</span>
                        <Autocomplete
                          look="nav"
                          name="location"
                          placeholder="Where's your party?"
                          noneFound="Unfortunately there are no companies serving this area"
                          onUpdate={onUpdate}
                        />
                      </div>
                    )}
                    {step === 2 && (
                      <div className={styles.location}>
                        <span>Event date</span>

                        <DatePicker
                          className={styles.datePicker}
                          format={"M/D/YYYY"}
                          disabledDate={disabledDate}
                          bordered={false}
                          onChange={(date, dateString) => setDate(date)}
                        />
                      </div>
                    )}
                  </div>
                  <div className={styles.mobileSearchFooter}>
                    {step === 1 && (
                      <div className={styles.locationFooter}>
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          onClick={saveLoc}
                          className={styles.bounceButton}
                        >
                          Save
                        </motion.div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className={styles.dateFooter}>
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setParty(loc, date), close(false), setStep(1);
                          }}
                          className={styles.bounceButton}
                        >
                          Search
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.searchBarHolder}>
              <div className={styles.searchBar}>
                <div className={styles.location}>
                  <span>Location</span>
                  <Autocomplete
                    look="nav"
                    name="location"
                    placeholder="Where's your party?"
                    noneFound="Unfortunately there are no companies serving this area"
                    onUpdate={onUpdate}
                  />
                </div>
                <div className={styles.date}>
                  <span>Event date</span>

                  <DatePicker
                    className={styles.datePicker}
                    format={"M/D/YYYY"}
                    disabledDate={disabledDate}
                    bordered={false}
                    onChange={(date, dateString) => setDate(date)}
                  />
                </div>
                <div className={styles.btnHolder}>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <div
                      onClick={() => {
                        setParty(loc, date), close(false);
                      }}
                      className={styles.btn}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                      Search
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavSearch;
