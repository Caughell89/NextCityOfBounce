import { motion } from "framer-motion";
import UserProvider from "../context/UserContext";
import Layout from "../components/Layout";
import "../styles/globals.css"
import { UserContextProvider } from '../utils/useUser';


function MyApp({ Component, pageProps, router }) {
  
  return (
    <UserContextProvider>
    <UserProvider>
      <Layout>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </Layout>
    </UserProvider>
    </UserContextProvider>
  );
}

export default MyApp;
