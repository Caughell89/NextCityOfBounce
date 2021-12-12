import Head from "next/head";
import { useUser } from "./../../utils/useUser";
import moment from "moment";
import React, { useState } from "react";
import { Form, Input, Button, Radio, Modal } from "antd";

export default function Account() {
  const { userLoaded, user, session, userDetails, signOut } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(userLoaded);
  console.log(user);
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
              <div>{user.phone ? user.phone : "Not Provided"}</div>
              <Button className="mt1 mb1" onClick={showModal}>
                Edit
              </Button>
            </div>
            <Modal
              title="Edit Profile"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  fullName: user.user_metadata.full_name,
                  email: user.email,
                  phone: user.phone,
                }}
              >
                <Form.Item
                  label="Full Name"
                  required
                  name="fullName"
                  tooltip="This is a required field"
                  initialValues={user.user_metadata.full_name}
                >
                  <Input size="large" placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  tooltip={{
                    title: "Tooltip with customize icon",
                  }}
                  initialValues={user.email}
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  tooltip={{
                    title: "Tooltip with customize icon",
                  }}
                  initialValues={user.phone}
                >
                  <Input size="large" placeholder="Phone" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
