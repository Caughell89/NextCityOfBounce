import Head from "next/head";
import { useUser } from "./../../utils/useUser";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Skeleton, Modal } from "antd";
import { supabase } from "../../utils/supabaseClient";
import { Alert } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

export default function Account() {
  const { userLoaded, user, session, userDetails } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPhoto, setEditPhoto] = useState("");
  const [error, setError] = useState();
  const [fileList, setFileList] = useState([]);

  const getSrcFromFile = (file) => {
    alert("test");
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleCrop = (e) => {
    console.log(e);
  };

  const onChange = async (info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      console.log(file);
      if (file.status === "done") {
        console.log(file.thumbUrl);
      }
      return file;
    });

    setFileList(fileList);
  };

  // useEffect(() => {
  //   uploadPhoto();
  // }, [fileList]);

  const uploadPhoto = async () => {
    if (fileList.length > 0) {
      const formData = new FormData();
      console.log(fileList[0]);
      formData.append("file", new File(fileList[0]));

      formData.append("upload_preset", "open_upload");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/" +
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME +
          "/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
    }
  };

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
  const handleEditPhoto = () => {
    setEditPhoto(true);
  };
  const savePhoto = (e) => {
    console.log("Save photo");
  };
  const cancelPhoto = () => {
    setEditPhoto(false);
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

  const [progress, setProgress] = useState(0);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    console.log(file);

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("image", file);
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
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
              <div>
                <ImgCrop onModalOk={handleCrop} rotate>
                  <Upload
                    accept="image/*"
                    customRequest={uploadImage}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    maxCount={1}
                  >
                    {
                      <>
                        <CameraOutlined /> <span className="ml1"> Edit</span>
                      </>
                    }
                  </Upload>
                </ImgCrop>
              </div>
              <div onClick={logImg} className="f12">
                Member Since {moment(user.created_at).format("LL")}
              </div>
            </div>
            <div>
              <div className="mt1 f12">Name</div>
              <div>{user.user_metadata.full_name}</div>
              <div className="mt1 f12">Email</div>
              <div>{user.email}</div>
              <div className="mt1 f12">Phone</div>
              <div>
                {user.user_metadata.phone
                  ? "(" +
                    user.user_metadata.phone.substr(0, 3) +
                    ") " +
                    user.user_metadata.phone.substr(3, 3) +
                    "-" +
                    user.user_metadata.phone.substr(6, 10)
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
                  Cancel
                </Button>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
