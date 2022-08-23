import { useState } from "react";
import { Button, Input, message, Checkbox } from "antd";
import React from "react";
import { config } from "../config";
import axios from "axios";

const Todo = (props) => {
  const { todo: serverTodo, refetch } = props;
  const todoId = serverTodo?.id;
  const isModifyMode = todoId !== undefined;

  const [inputTodo, setInputTodo] = useState(isModifyMode ? serverTodo.todo : "");
  const [isCompleted, setIsCompleted] = useState(isModifyMode ? serverTodo.isCompleted : false);
  const [enableModify, setEnableModify] = useState(false);
  const btnText = isModifyMode ? "수정" : "추가";

  const handleClick = () => {
    if (isModifyMode) {
      setEnableModify(true);
    } else {
      regTodo();
    }
  };

  const regTodo = async () => {
    try {
      const param = { todo: inputTodo };
      const responseData = await axios.post(`${config.API}/todos`, param, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const { status } = responseData;
      if (status === 201) {
        refetch();
        setInputTodo("");
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const modifyTodo = async (isCompleted) => {
    try {
      const param = { todo: inputTodo, isCompleted };
      const responseData = await axios.put(`${config.API}/todos/${todoId}`, param, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const { status } = responseData;
      if (status === 200) {
        message.success("수정 완료");
        setEnableModify(false);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const responseData = await axios.delete(`${config.API}/todos/${todoId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const { status } = responseData;
      if (status === 204) {
        refetch();
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      {isModifyMode && (
        <Checkbox
          onChange={(e) => {
            modifyTodo(e.target.checked);
            setIsCompleted(e.target.checked);
          }}
          checked={isCompleted}
        >
          완료
        </Checkbox>
      )}
      <Input.Group>
        <Input
          onChange={(e) => {
            setInputTodo(e.target.value);
          }}
          value={inputTodo}
          style={{ width: "50%" }}
          disabled={isModifyMode ? !enableModify : false}
        />
        {!enableModify && (
          <Button type={isModifyMode ? "dashed" : "primary"} onClick={handleClick}>
            {btnText}
          </Button>
        )}
        {enableModify && (
          <>
            <Button
              type={isModifyMode ? "dashed" : "primary"}
              onClick={() => {
                modifyTodo(isCompleted);
              }}
            >
              수정하기
            </Button>
            <Button
              type={isModifyMode ? "dashed" : "primary"}
              onClick={() => {
                setInputTodo(serverTodo.todo);
                setEnableModify(false);
              }}
            >
              취소
            </Button>
          </>
        )}
        {isModifyMode && (
          <Button danger onClick={handleDelete}>
            삭제
          </Button>
        )}
      </Input.Group>
    </>
  );
};

export default Todo;
