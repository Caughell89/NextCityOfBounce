import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import styles from "../styles/NavSearch.module.css";
import Autocomplete from "./Autocomplete";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { UserContext } from "./../context/UserContext";
import { DatePicker } from 'antd';

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
  const [loc, setLoc] = useState("");
  const [date, setDate] = useState(null);
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const onUpdate = (res) => {
    setLoc(res);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {navSearch && (
        <motion.div
          variants={searchVars}
          initial="hidden"
          exit="hidden"
          animate="visible"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavSearch;
