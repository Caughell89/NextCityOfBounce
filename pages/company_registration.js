import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { Steps, Form, Input, Button, AutoComplete, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import { supabase } from "../utils/supabaseClient";

export default function RegisterCompany() {
  const { Step } = Steps;
  const { Option } = AutoComplete;
  const [step, setStep] = useState(1);

  const [options, setOptions] = useState([]);

  const handleBack = () => {
    setStep(step - 1);
  };
  const getOptions = async (value) => {
    if (value.length > 2) {
      const loc = value.split(",");
      const city = loc[0];
      let state = "%";
      if (loc.length > 1) {
        state = loc[1].trim();
      }
      const { data, error } = await supabase
        .from("locations")
        .select()
        .ilike("city", city + "%")
        .ilike("state_id", state + "%");
      setOptions(data);
      console.log(data);
      console.log(error);
    } else {
      setOptions([]);
      console.log("Too short");
    }
  };

  const onFinish = (data) => {
    console.log(data);
    console.log("Push a head");
    setStep(1);
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  return (
    <div>
      <Head>
        <title>Company Registration - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h1>Company Registration</h1>
        <Steps current={step}>
          <Step
            title="The Basics"
            description="What's your company name and location"
          />
          <Step
            title="Branding"
            description="Upload a logo and background image"
          />
          <Step
            title="Locations"
            description="List locations you provide services"
          />
        </Steps>
        {step === 0 && (
          <div>
            <Row justify="center" className="mb2 mt2">
              <Col md={20} xs={24}>
                Provide your company name and primary location. This will allow
                users to search for you and your services as well as generate
                your own website url to share with your customers.
              </Col>
            </Row>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Company name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your company name" },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Company location"
                name="location"
                rules={[
                  { required: true, message: "Please enter your location" },
                ]}
              >
                <AutoComplete size="large" onSearch={getOptions}>
                  {options.map((loc) => (
                    <Option key={loc.id} value={loc.city + ", " + loc.state_id}>
                      {loc.city + ", " + loc.state_id}
                    </Option>
                  ))}
                </AutoComplete>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {step === 1 && (
          <div>
            <Row onClick={handleBack} className="mb2 mt2 row">
              <LeftOutlined />
              Back
            </Row>
            <Row justify="center" className="mb2 mt2">
              <Col md={20} xs={24}>
                Add a little bit of branding to help you standout. Upload a logo
                image and a background image if you like to show a bit of your
                company's personality.
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
