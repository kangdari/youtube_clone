import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const Wrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 700px;
  margin: 2rem auto;

  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
];

const categoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" }
];

const VideoUploadPage = () => {
  const [form, setForm] = useState({
    videoTitle: "",
    description: ""
  });
  const [Private, setPrivate] = useState(0); // public: 1, private: 0
  const [category, setCategory] = useState("Film & Animation");
  // input 상태 입력
  const onChange = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onPrivateChange = e => {
    setPrivate(e.currentTarget.value);
  }

  const onCategoryChange = e => {
      setCategory(e.currentTarget.value);
  }

  return (
    <Wrapper>
      <div className="title">
        <Title>Upload Page</Title>
      </div>

      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Dropzone */}
          <Dropzone onDrop multiple maxSize>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/* thumbnail */}
          <div>
            <img src="" art="img" />
          </div>
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input name="videoTitle" onChange={onChange} value={form.videoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea name="description" onChange={onChange} value={form.description} />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {categoryOptions.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </Wrapper>
  );
};

export default VideoUploadPage;
