import { Layout, message, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";

const { Header, Content } = Layout;

const TodoPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [todoList, setTodoList] = useState([]);

  const handleGetToDos = async () => {
    try {
      const responseData = await axios.get(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { data } = responseData;
      setTodoList(data);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    handleGetToDos();
  }, []);

  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%", background: "#fff" }} />
        <Content style={{ padding: "0 50px", marginTop: 64, background: "#fff" }}>
          <Space direction="vertical" size="small" style={{ display: "flex" }}>
            <Todo todo={undefined} refetch={handleGetToDos} />
            {todoList &&
              todoList.map((todo) => {
                return <Todo todo={todo} key={todo.id} refetch={handleGetToDos} />;
              })}
          </Space>
        </Content>
      </Layout>
    </>
  );
};

export default TodoPage;
