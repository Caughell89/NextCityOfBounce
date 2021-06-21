import { useState } from "react";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { supabase, updateUserSignUp } from "../utils/supabaseClient";
import { motion } from "framer-motion";


async function facebookSignUp() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'facebook'
  }, {
    scopes: 'email public_profile'
  })

}

async function googleSignUp() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google'
  }, {
    scopes: 'email profile'
  })

}

const Signup = ({ showLogin }) => {
  const [socialSignup, setSocialSignup] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSignup = async (e) => {
    setLoading(true);
    setMessage({});
    const { error, user } = await supabase.auth.signUp({ email: e.email,
      password: e.password, });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      if (user) {
        await updateUserSignUp(user, e.name);
        setUser(user);
      } else {
        setMessage({
          type: 'note',
          content: 'Check your email for the confirmation link.'
        });
      }
    }
    setLoading(false);
  };
  const onFinish = (values) => {
    handleSignup(values)
    // signUp(values)
    console.log(values);
  };
  return (
    <>
      <div className={styles.modalContent}>
        {socialSignup && (
          <>
            <motion.div
                  whileTap={{ scale: 0.9 }}>
              <a
                className={`${styles.modalFullBtn} ${styles.googleBtn}`}
                onClick={googleSignUp}
              >
                <Image
                  src="/google-logo.png"
                  alt="Google"
                  height="32"
                  width="32"
                />
                <div className={styles.center}>Sign up with Google</div>
                <div className={styles.holder}></div>
              </a>
            </motion.div>
            <motion.div
                  whileTap={{ scale: 0.9 }}>
              <a
                className={`${styles.modalFullBtn} ${styles.fbBtn}`}
                onClick={facebookSignUp}
              >
                <Image src="/fb-logo.png" alt="Google" height="32" width="32" />
                <div className={styles.center}>Sign up with Facebook</div>
                <div className={styles.holder}></div>
              </a>
            </motion.div>
            <div className={styles.orRow}>
              <span className={styles.or}>or</span>
            </div>

            <motion.div
                  whileTap={{ scale: 0.9 }}
              onClick={() => setSocialSignup(false)}
              className={`${styles.modalFullBtn} ${styles.bounceColor}`}
            >
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className={styles.center}>Sign up with Email</div>
              <div className={styles.holder}></div>
            </motion.div>
          </>
        )}
        {!socialSignup && (
          <>
            <div className={styles.socalOptions}>
              <span>
                Sign up with{" "}
                <a className={styles.googleLink} onClick={googleSignUp}>
                  Google{" "}
                </a>
                or{" "}
                <a className={styles.fbLink} onClick={facebookSignUp}>
                  Facebook
                </a>
              </span>
            </div>
            <div className={styles.orRow}>
              <span className={styles.or}>or</span>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
             
              <Form.Item
                name="name"
                
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Full Name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  

                />
              </Form.Item>
              <Form.Item
                name="password"
               
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <span className={styles.pushRight}>
                  <Link href="/forgot">Forgot password</Link>
                </span>
              </Form.Item>
              <Form.Item>
              <motion.div
                  whileTap={{ scale: 0.9 }}>
                 
                <button className={styles.bounceButton} htmltype="submit">
                  Sign Up
                </button>
                </motion.div>
              </Form.Item>

              <Form.Item>
                <span>Already have an account</span>
                <Button onClick={showLogin} className={styles.pushRight}>Log in</Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default Signup;
