import "../styles/antd.less";
import "../styles/globals.css";
import { motion } from "framer-motion";
import UserProvider from "../context/UserContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps, router }) {
  return (
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
  );
}

export default MyApp;
