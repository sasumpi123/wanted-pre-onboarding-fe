import { Button, Form as AntForm, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      const param = {
        email: inputEmail,
        password: inputPw,
      };
      const responseData = await axios.post(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup`, param);

      const { data } = responseData;
      if (data.access_token !== null) {
        message.success("회원가입 완료");
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const signIn = async () => {
    const param = {
      email: inputEmail,
      password: inputPw,
    };
    try {
      const responseData = await axios.post(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin`, param);
      const { data } = responseData;
      localStorage.setItem("accessToken", data.access_token);
      navigate("/todo");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const valid = inputEmail.includes("@") && inputPw.length >= 8;

  return (
    <>
      <AntForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ width: "75%" }}
      >
        <AntForm.Item label="Email" name="email" rules={[{ required: true, message: "Enter a valid email address!" }]}>
          <Input
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
          />
        </AntForm.Item>
        <AntForm.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password
            onChange={(e) => {
              setInputPw(e.target.value);
            }}
          />
        </AntForm.Item>

        <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={signUp} disabled={!valid} style={{ marginRight: 10 }}>
            회원가입
          </Button>
          <Button type="primary" onClick={signIn} disabled={!valid}>
            로그인
          </Button>
        </AntForm.Item>
      </AntForm>
    </>
  );
};

export default Form;
