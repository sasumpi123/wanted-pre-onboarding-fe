import { Layout } from "antd";
import Form from "../components/Form";
import { Navigate } from "react-router-dom";

const { Header, Content } = Layout;

const isLogin = localStorage.getItem("accessToken") !== null;

const Home = () => {
  return (
    <>
      {isLogin && <Navigate to="/todo" replace={true} />}
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%", background: "#fff" }} />
        <Content style={{ padding: "0 50px", marginTop: 64, background: "#fff" }}>
          <Form />
        </Content>
      </Layout>
    </>
  );
};

export default Home;
