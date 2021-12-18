import Head from "next/head";
import { useUser } from "./../../utils/useUser";
import moment from "moment";
import React, { useState } from "react";
import { Form, Input, Button, Radio, Modal } from "antd";
import { supabase } from "../../utils/supabaseClient";
import { Alert } from "antd";

export default function Account() {
  const { userLoaded, user, session, userDetails } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState();
  console.log(userLoaded);
  console.log(user);
  console.log(error);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    log(e);
  };

  async function onFinish(values) {
    console.log(values);

    const { user, error } = await supabase.auth.update({
      data: { full_name: values.full_name, phone: values.phone },
      email: values.email,
    });
    console.log(user);
    console.log(error);
    error ? setError(error.message) : (setError(), setIsModalVisible(false));
  }

  const [form] = Form.useForm();
  return (
    <div>
      <Head>
        <title>Account - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="City of Bounce Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h1>Your Account</h1>
        {userLoaded && (
          <div>
            <div className="mb1">
              <img src={user.user_metadata.avatar_url} alt="user profile pic" />
              <div>Member Since {moment(user.created_at).format("LL")}</div>
            </div>
            <div>
              <div className="mt1 f12">Name</div>
              <div>{user.user_metadata.full_name}</div>
              <div className="mt1 f12">Email</div>
              <div>{user.email}</div>
              <div className="mt1 f12">Phone</div>
              <div>
                {user.user_metadata.phone
                  ? user.user_metadata.phone
                  : "Not Provided"}
              </div>
              <Button className="mt1 mb1" onClick={showModal}>
                Edit
              </Button>
            </div>
            <Modal
              title="Edit Profile"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              destroyOnClose={true}
            >
              {error != undefined && (
                <Alert
                  message="Update failed"
                  description={error}
                  type="error"
                  showIcon
                />
              )}
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  full_name: user.user_metadata.full_name,
                  email: user.email,
                  phone: user.user_metadata.phone,
                }}
                onFinish={onFinish}
                className="mt1"
              >
                <Form.Item
                  label="Full Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                  name="full_name"
                  tooltip="This is a required field"
                  hasFeedback
                >
                  <Input size="large" placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                    {
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  ]}
                  hasFeedback
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  tooltip={{
                    title:
                      "Enter your phone number without any formatting like ########## or 5555555555",
                  }}
                  rules={[
                    {
                      required: false,
                      message: "Please enter your phone number",
                    },
                    {
                      len: 10,
                      message: "Please enter a valid phone number",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="number"
                    pattern="\d*"
                    addonBefore="+1"
                    size="large"
                    placeholder="Phone"
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={handleCancel}
                >
                  Clear
                </Button>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
