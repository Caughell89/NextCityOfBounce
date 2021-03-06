import { useState } from "react";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { supabase, updateUserSignUp } from "../utils/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const passwordReqsVars = {
  hidden: {
    opacity: 0,
    scale: 0.2,
    y: 0,
    transition: {
      type: "spring",
      mass: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: -64,
    scale: 1,
    transition: {
      type: "spring",
      mass: 0.5,
    },
  },
};

async function facebookSignUp() {
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: "facebook",
    },
    {
      scopes: "email public_profile",
    }
  );
}

async function googleSignUp() {
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: "google",
    },
    {
      scopes: "email profile",
    }
  );
}

const Signup = ({ showLogin }) => {
  const [socialSignup, setSocialSignup] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);
  const [passwordCap, setPasswordCap] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordSymbol, setPasswordSymbol] = useState(false);
  const [passwordLower, setPasswordLower] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);

  const handlePassword = () => {
    setShowPasswordReqs(true);
  };

  const hidePasswordReqs = () => {
    setShowPasswordReqs(false);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPassword(value);
    const lowerCaseLetters = /[a-z]/g;
    if (value.match(lowerCaseLetters)) {
      setPasswordLower(true);
    } else {
      setPasswordLower(false);
    }

    // Validate symbols
    const symbols = /[!@#$%^&*)(+=._-]/g;
    if (value.match(symbols)) {
      setPasswordSymbol(true);
    } else {
      setPasswordSymbol(false);
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    if (value.match(upperCaseLetters)) {
      setPasswordCap(true);
    } else {
      setPasswordCap(false);
    }

    // Validate numbers
    const numbers = /[0-9]/g;
    if (value.match(numbers)) {
      setPasswordNumber(true);
    } else {
      setPasswordNumber(false);
    }

    //Validate length
    if (value.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
    passwordCap &&
    passwordLower &&
    passwordSymbol &&
    passwordLength &&
    passwordNumber
      ? setValidPass(true)
      : setValidPass(false);
  };

  const handleSignup = async (e) => {
    setLoading(true);
    setMessage({});
    const { error, user } = await supabase.auth.signUp({
      email: e.email,
      password: e.password,
    });
    if (error) {
      setMessage({ type: "error", content: error.message });
    } else {
      if (user) {
        await updateUserSignUp(user, e.name);
        setUser(user);
      } else {
        setMessage({
          type: "note",
          content: "Check your email for the confirmation link.",
        });
      }
    }
    setLoading(false);
  };
  const onFinish = (values) => {
    handleSignup(values);
    // signUp(values)
    console.log(values);
  };

  return (
    <>
      <div className={styles.modalContent}>
        {socialSignup && (
          <>
            <motion.div whileTap={{ scale: 0.9 }}>
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
            <motion.div whileTap={{ scale: 0.9 }}>
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
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    min: 1,
                  },
                ]}
                hasFeedback
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Full Name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                ]}
                hasFeedback
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <div className={styles.relative}>
                <AnimatePresence exitBeforeEnter>
                  {showPasswordReqs && (
                    <motion.div
                      variants={passwordReqsVars}
                      initial="hidden"
                      exit="hidden"
                      animate="visible"
                      id={styles.passwordRequirements}
                    >
                      <div>Create a password with these requirements:</div>
                      <div className="requirments-list">
                        <span
                          id="uppercase-req"
                          className={
                            passwordCap
                              ? `${styles.valid} ${styles.req}`
                              : `${styles.invalid} ${styles.req}`
                          }
                        >
                          ABC
                        </span>
                        <span
                          id="lowercase-req"
                          className={
                            passwordLower
                              ? `${styles.valid} ${styles.req}`
                              : `${styles.invalid} ${styles.req}`
                          }
                        >
                          abc
                        </span>

                        <span
                          id="number-req"
                          className={
                            passwordNumber
                              ? `${styles.valid} ${styles.req}`
                              : `${styles.invalid} ${styles.req}`
                          }
                        >
                          123
                        </span>
                        <span
                          id="symbol-req"
                          className={
                            passwordSymbol
                              ? `${styles.valid} ${styles.req}`
                              : `${styles.invalid} ${styles.req}`
                          }
                        >
                          !@%
                        </span>
                        <span
                          id="character-req"
                          className={
                            passwordLength
                              ? `${styles.valid} ${styles.req}`
                              : `${styles.invalid} ${styles.req}`
                          }
                        >
                          8 Characters
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Form.Item
                name="password"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (validPass) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("The password does not meet requirements!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  onFocus={handlePassword}
                  onBlur={hidePasswordReqs}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handlePasswordChange}
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
                <motion.div whileTap={{ scale: 0.9 }}>
                  <button className={styles.bounceButton} htmltype="submit">
                    Sign Up
                  </button>
                </motion.div>
              </Form.Item>

              <Form.Item>
                <span>Already have an account?</span>
                <Button onClick={showLogin} className={styles.pushRight}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default Signup;
