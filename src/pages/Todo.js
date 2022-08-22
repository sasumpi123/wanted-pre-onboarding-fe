import { Layout } from "antd";

const { Header, Content } = Layout;

const Todo = () => {
  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%", background: "#fff" }} />
        <Content style={{ padding: "0 50px", marginTop: 64, background: "#fff" }}>todo</Content>
      </Layout>
    </>
  );
};

export default Todo;
