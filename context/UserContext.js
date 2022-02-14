import { useState, createContext, useEffect } from "react";
import { getCurrentUser, loginUser } from "../utils/API";
import { ACCESS_TOKEN } from "../utils/constants";
import { useRouter } from "next/router";
import { stringLocToUrl } from "../utils/FormTools";
import moment from "moment";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const loadUser = () => {
    console.log("loading user");
    getCurrentUser()
      .then((response) => {
        setUserDetails(response);
        setLoggedIn(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (values) => {
    const loginRequest = {
      email: values.Email,
      password: values.password,
    };
    console.log(loginRequest);

    loginUser(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        loadUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = (value) => {
    localStorage.removeItem(ACCESS_TOKEN);
    setLoggedIn(false);
    setUserDetails([]);
  };

  const setParty = (loc, d) => {
    console.log(loc);
    console.log(d);
    let dateUrl = "any";
    if (loc !== "") {
      setLocation(loc);
      d === null ? setDate("") : setDate(moment(d).format("M/D/YYYY"));
      if (d !== null || d !== "") {
        dateUrl = moment(d).format("YYYY-M-D");
      }
      router.push({
        pathname: "/s/search",
        query: { location: stringLocToUrl(loc), date: dateUrl },
      });
    }
  };

  const contextValue = {
    status: {
      loggedIn,
      login,
      logout,
      loadUser,
    },
    user: {
      userDetails,
      setUserDetails,
    },
    location,
    date,
    setParty,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
