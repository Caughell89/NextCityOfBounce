import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "./supabaseClient";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  console.log("getting session");
  console.log(session);
  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const getUserDetails = () => supabase.from("users").select("*").single();

  useEffect(() => {
    if (user) {
      getUserDetails().then((results) => {
        setUserDetails(results);
        setUserLoaded(true);
      });
    }
  }, [user]);

  const value = {
    session,
    user,
    userDetails,
    userLoaded,

    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => {
      setUserLoaded(false);
      setUserDetails(null);
      return supabase.auth.signOut();
    },
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
