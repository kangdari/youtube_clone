import React from "react";
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

const VideoUploadPage = () => {
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
                <PlusOutlined style={{ fontSize: '3rem' }} />
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
        <Input onChage value />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChage value />
        <br />
        <br />
        <select onChange>
          <option key value></option>
        </select>
        <br />
        <br />
        <select onChange>
          <option key value></option>
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
