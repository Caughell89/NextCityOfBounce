import { useState } from "react";
import styles from "../styles/Login.less";
import Image from "next/image";
import Link from "next/link";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  ACCESS_TOKEN,
} from "../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signup } from "../util/API";

const Signup = ({ showLogin }) => {
  const [socialSignup, setSocialSignup] = useState(true);

  const onFinish = () => {
    alert("done");
  };
  return (
    <>
      <div className={styles.modalContent}>
        {socialSignup && (
          <>
            <div>
              <a
                className={`${styles.modalFullBtn} ${styles.googleBtn}`}
                href={GOOGLE_AUTH_URL}
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
            </div>
            <div>
              <a
                className={`${styles.modalFullBtn} ${styles.fbBtn}`}
                href={FACEBOOK_AUTH_URL}
              >
                <Image src="/fb-logo.png" alt="Google" height="32" width="32" />
                <div className={styles.center}>Sign up with Facebook</div>
                <div className={styles.holder}></div>
              </a>
            </div>
            <div className={styles.orRow}>
              <span className={styles.or}>or</span>
            </div>

            <div
              onClick={() => setSocialSignup(false)}
              className={`${styles.modalFullBtn} ${styles.bounceColor}`}
            >
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className={styles.center}>Sign up with Email</div>
              <div className={styles.holder}></div>
            </div>
          </>
        )}
        {!socialSignup && (
          <>
            <div className={styles.socalOptions}>
              <span>
                Sign up with{" "}
                <a className={styles.googleLink} href={GOOGLE_AUTH_URL}>
                  Google{" "}
                </a>
                or{" "}
                <a className={styles.fbLink} href={FACEBOOK_AUTH_URL}>
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
                name="FirstName"
                rules={[
                  {
                    required: true,
                    type: "text",
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    type: "text",
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Last Name"
                />
              </Form.Item>
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
                  Sign Up
                </button>
              </Form.Item>

              <Form.Item>
                <span>Don't Have an Account?</span>

                <Button className={styles.pushRight}>Register now!</Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default Signup;
