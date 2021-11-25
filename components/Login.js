import styles from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Input, Form, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabaseClient";

async function facebookSignIn() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "facebook",
  });
}

async function googleSignIn() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google",
  });
  console.log(session);
}

const openNotificationWithIcon = (e) => {
  notification["error"]({
    message: "Login Failed",
    description: e,
  });
};

const Login = ({ close, showSignup }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSignin = async (values) => {
    console.log(values);
    setLoading(true);
    setMessage({});

    const { error } = await supabase.auth
      .signIn({
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        response.error
          ? openNotificationWithIcon(response.error.message)
          : console.log(response);
      })

      .catch((error) => {
        console.log(error);
        setMessage({ type: "error", content: error.message });
      });
    setLoading(false);
  };
  const onFinish = (values) => {
    console.log(values);
    handleSignin(values)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={styles.modalContent}>
        <motion.div whileTap={{ scale: 0.9 }}>
          <a
            className={`${styles.modalFullBtn} ${styles.googleBtn}`}
            // href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}
            onClick={googleSignIn}
          >
            <Image src="/google-logo.png" alt="Google" height="32" width="32" />
            <div className={styles.center}>Log in with Google</div>
            <div className={styles.holder}></div>
          </a>
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }}>
          <a
            className={`${styles.modalFullBtn} ${styles.fbBtn}`}
            // href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}
            onClick={facebookSignIn}
          >
            <Image src="/fb-logo.png" alt="Google" height="32" width="32" />
            <div className={styles.center}>Log in with Facebook</div>
            <div className={styles.holder}></div>
          </a>
        </motion.div>
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
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
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
            <button className={styles.bounceButton} htmltype="submit">
              Login
            </button>
          </Form.Item>

          <Form.Item>
            <span>Don't Have an Account?</span>

            <Button onClick={showSignup} className={styles.pushRight}>
              Register now!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
