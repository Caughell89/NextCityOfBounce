import styles from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  ACCESS_TOKEN,
} from "../util/constants";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = ({ showSignup }) => {
  const userCtx = useContext(UserContext);

  const onFinish = (values) => {
    userCtx.status.login(values);
  };
  return (
    <>
      <div className={styles.modalContent}>
        <div>
          <a
            className={`${styles.modalFullBtn} ${styles.googleBtn}`}
            href={GOOGLE_AUTH_URL}
          >
            <Image src="/google-logo.png" alt="Google" height="32" width="32" />
            <div className={styles.center}>Log in with Google</div>
            <div className={styles.holder}></div>
          </a>
        </div>
        <div>
          <a
            className={`${styles.modalFullBtn} ${styles.fbBtn}`}
            href={FACEBOOK_AUTH_URL}
          >
            <Image src="/fb-logo.png" alt="Google" height="32" width="32" />
            <div className={styles.center}>Log in with Facebook</div>
            <div className={styles.holder}></div>
          </a>
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
            name="Email"
            rules={[
              {
                required: true,
                type: "email",
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
            <button className={styles.bounceButton} htmlType="submit">
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
