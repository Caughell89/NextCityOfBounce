import Head from "next/head";
import { useUser } from "./../../utils/useUser";
import moment from "moment";
import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";

export default function Account() {
  const [editForm, setEditForm] = useState(false);
  const { userLoaded, user, session, userDetails, signOut } = useUser();
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
            <div>
              <img src={user.user_metadata.avatar_url} alt="user profile pic" />
              <div>{moment(user.created_at).format("LL")}</div>
            </div>
            {!editForm ? (
              <div>
                <div>{user.user_metadata.full_name}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <Button onClick={(e) => setEditForm(true)}>Edit</Button>
              </div>
            ) : (
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  requiredMarkValue: requiredMark,
                }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
              >
                <Form.Item
                  label="Full Name"
                  required
                  tooltip="This is a required field"
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary">Submit</Button>
                </Form.Item>
                <Form.Item>
                  <div onClick={(e) => setEditForm(false)}>Cancel</div>
                </Form.Item>
              </Form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
