import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Steps,
  Form,
  Input,
  Alert,
  AutoComplete,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  LeftOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useUser } from "../utils/useUser";
import { useMediaQuery } from "react-responsive";
import { supabase } from "../utils/supabaseClient";

const CompanyForm = () => {
  const { userLoaded, user, userDetails, session } = useUser();
  const router = useRouter();

  console.log(session);
  console.log(userLoaded);
  console.log(user);
  console.log(userDetails);

  useEffect(() => {
    // Update the document title using the browser API
    if (session && userLoaded) {
      if (userDetails.data.hasCompany) {
        router.push("/c/company_manager");
      }
    }
    if (!session) {
      console.log("log in man");
      router.push("/");
    }
  });

  const { Step } = Steps;
  const { Option } = AutoComplete;
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [options, setOptions] = useState([]);
  const [registrationError, setRegistrationError] = useState(false);
  const [savedCompany, setSavedCompany] = useState();

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

  const onFinish = async (formData) => {
    console.log(formData);
    setLoading(true);
    setRegistrationError(false);
    const { data: company_data, error: company_error } = await supabase
      .from("companies")
      .insert({
        name: formData.name,
        location: formData.location,
        url:
          "cityofbounce.com/shop/" +
          formData.location.replace(/, | /g, "_").toLowerCase() +
          "/" +
          formData.name.replace(/, | /g, "_").toLowerCase(),
      });
    const company_id = company_data[0].id;

    if (company_error) {
      console.log(company_error);

      console.log("name already taken ");
      setRegistrationError(true);
      setCompanyLocation(formData.location.replace(/, | /g, "_").toLowerCase());
      setCompanyName(formData.name.replace(/, | /g, "_").toLowerCase());
    } else {
      const { data: user_data, error: user_error } = await supabase
        .from("users")
        .update({ hasCompany: true })
        .match({ id: user.id });
      console.log(user_data);
      console.log(user_error);
      const { data: employee_data, error: employee_error } = await supabase
        .from("employees")
        .insert([{ user_id: user.id, company_id: company_id, role_id: 0 }]);
      console.log(employee_data);
      console.log(employee_error);
      setStep(1);
    }
    setLoading(false);
  };
  const isTabletOrMobile = useMediaQuery({ maxWidth: 641 });
  return (
    <div>
      {isTabletOrMobile ? (
        <Steps size="small" current={step}>
          <Step title="The Basics" />
          <Step title="Branding" />
          <Step title="Locations" />
        </Steps>
      ) : (
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
      )}
      {step === 0 && (
        <div>
          <Row justify="center" className="mb2 mt2">
            Provide your company name and primary location. This will allow
            users to search for you and your services as well as generate your
            own website url to share with your customers.
          </Row>
          <Row justify="center" className="mb2 mt2">
            Below is what your web address will be based on your input, as long
            as it is not already taken.{" "}
            <Tooltip
              title="User input is converted to lower case to build the web address"
              color="#1cacc8"
            >
              <InfoCircleOutlined className="ml1" />
            </Tooltip>
          </Row>
          {registrationError && (
            <>
              <Alert
                message="Error"
                description="This company has already been registered"
                type="error"
                showIcon
              />
              <div className="flex-column">
                <div className="mt1 mb1">
                  <Link href={"/shop/" + companyLocation + "/" + companyName}>
                    Go to site
                  </Link>
                </div>
                <div className="bounceButton">Request access</div>
              </div>
            </>
          )}
          <Row justify="center" className="mb2 mt2">
            Web Address:
            <span className="ml1 bold bounceBlue underline">
              cityofbounce.com/shop/
              {companyLocation.replace(/, | /g, "_").toLowerCase()}/
              {companyName.replace(/, | /g, "_").toLowerCase()}
            </span>
          </Row>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              label="Company location"
              name="location"
              hasFeedback
              rules={[
                { required: true, message: "Please enter your location" },
              ]}
            >
              <AutoComplete
                onSearch={getOptions}
                onSelect={(e) => {
                  setCompanyLocation(e);
                }}
              >
                {options.map((loc) => (
                  <Option key={loc.id} value={loc.city + ", " + loc.state_id}>
                    {loc.city + ", " + loc.state_id}
                  </Option>
                ))}
              </AutoComplete>
            </Form.Item>
            <Form.Item
              label="Company name"
              name="name"
              hasFeedback
              rules={[
                { required: true, message: "Please enter your company name" },
              ]}
            >
              <Input
                name="companyName"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              {loading ? (
                <div className="cancelButton">
                  <LoadingOutlined className="mr1" /> Saving
                </div>
              ) : (
                <button className="bounceButton" htmltype="submit">
                  Submit
                </button>
              )}
            </Form.Item>
          </Form>
        </div>
      )}
      {step === 1 && (
        <div>
          <Row onClick={handleBack} className="mb2 mt2 row pointer">
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
  );
};
export default CompanyForm;
